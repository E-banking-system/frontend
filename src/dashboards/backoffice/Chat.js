import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../../Chat.css';
import Header from '../../components/Header';
import config from '../../config';
import axios from 'axios';
import { FaCloudUploadAlt  } from 'react-icons/fa';

function Chat() {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const userId = localStorage.getItem('user_id');

  const fetchClients = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(config.apiURI + '/api/v1/banquier/clients', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setClients(response.data.content);
    } catch (error) {
      console.warn('Error fetching clients:', error);
    }
  }

  const fetchMessages = async () => {
    try {
      if (selectedClient) {
        const response = await fetch(
          config.apiURI + `/BankerClientMessages?userId=${userId}&receiverId=${selectedClient}`
        );
        const messages = await response.json();
  
        const chatMessages = messages.filter(
          message => message.type === 'CHAT' || message.type === 'FILE'
        );
        chatMessages.sort(
          (a, b) =>
            new Date(b.localDateTime) - new Date(a.localDateTime)
        );
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  

   useEffect(() => {
    const socket = new SockJS(config.apiURI + '/ws');
    const client = new Client({ webSocketFactory: () => socket });

    

    client.onConnect = () => {
      setStompClient(client);
      // Check if not already subscribed before subscribing
      if (!isSubscribed) {
        client.subscribe('/topic/public', onMessageReceived);
        setIsSubscribed(true);
      }
      onConnected();
      client.disconnect(); // Disconnect after connecting if necessary
    };
    
    client.onStompError = (error) => {
      console.log('STOMP Error:', error);
      onError();
    };

    client.activate();

    fetchClients();

    // Fetch messages here
    fetchMessages();

    return () => {
      // Clean up and disconnect the socket when the component unmounts
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    // Fetch messages here whenever selectedClient changes
    fetchMessages();
  }, [selectedClient]);


  const selectClient = (clientId) => {
    setSelectedClient(clientId);
  };

  const onConnected = () => {
    if (stompClient) {
      stompClient.subscribe('/topic/public', (payload) => {
        // Handle incoming message here
        const message = JSON.parse(payload.body);
        setMessages(prevMessages => [...prevMessages, message].sort((a, b) => new Date(b.localDateTime) - new Date(a.localDateTime)));
      });
  
      stompClient.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({ sender: localStorage.getItem('penom'), type: 'JOIN' }),
      });
    }
  };
  


  const onError = () => {
    console.log('Could not connect to WebSocket server.');
  };


  const sendMessage = async (event) => {
    event.preventDefault();
  
    const messageContent = messageInput.trim();
  
    if ((messageContent || selectedFile) && stompClient && stompClient.connected) {
      if (messageContent) {
        const chatMessage = {
          senderId: localStorage.getItem('user_id'),
          content: messageInput,
          type: 'CHAT', 
          receiverId: selectedClient
        };
  
        stompClient.publish({
          destination: '/app/banker.chat.sendMessage',
          body: JSON.stringify(chatMessage),
        });
      }
  
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const fileContent = e.target.result.split(',')[1];
          const fileMessage = {
            sender: { id: localStorage.getItem('user_id') },
            receiver: { id: selectedClient },
            content: fileContent,
            fileName: selectedFileName,
            fileType: selectedFile.type,
            type: 'FILE',
          };
  
          stompClient.publish({
            destination: '/app/banker.chat.sendFile',
            body: JSON.stringify(fileMessage),
          });
  
          setSelectedFile(null);
          setSelectedFileName('');
        };
        reader.readAsDataURL(selectedFile);
      }
  
      setMessageInput('');
    }
  };
  

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages(prevMessages => [...prevMessages, message].sort((a, b) => new Date(b.localDateTime) - new Date(a.localDateTime)));
  };


  function breakStringIntoLines(text, maxLength) {
    const lines = [];
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.slice(i, i + maxLength));
    }
    return lines;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  return (
    <>
      <nav className="bg-white py-4 px-8 flex justify-end mr-14 mt-8">
        <Header />
      </nav>
      <div className="App">
        <div id="chat-page" className="flex h-screen">
          <div className="client-list w-1/4 p-4" style={{boxShadow: '0 1px 10px rgba(0, 0, 0, 0.27)'}}>
            <h3 className="text-lg font-semibold mb-4">Discussions</h3>
            <ul>
              {clients.map((client) => (
                <li
                  key={client.id}
                  className={`client-item cursor-pointer p-2 mb-2 ml-2 rounded-md ${
                    selectedClient === client.id ? 'bg-gray-300 text-black' : 'bg-white'
                  } hover:bg-gray-400 hover:text-black transition-colors`}
                  onClick={() => selectClient(client.id)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-semibold">
                        {client.prenom[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {client.prenom} {client.nom}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-container flex-grow bg-gray-100 pr-2 pl-2 rounded">
            <div className="chat-header">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {localStorage.getItem('prenom')[0]}
                  </span>
                </div>
                <span className="ml-3 text-xl font-semibold">
                  {localStorage.getItem('prenom')} {localStorage.getItem('nom')}
                </span>
              </div>
            </div>
            <ul id="messageArea" className="chat-messages h-64 overflow-y-auto">
              {messages.map((message, index) => (
                <li key={index} className={message.type === 'JOIN' || message.type === 'LEAVE' ? 'event-message' : 'chat-message'}>
                  {message.type === 'JOIN' && `${message.sender} joined!`}
                  {message.type === 'LEAVE' && `${message.sender} left!`}
                  {message.type === 'CHAT' && (
                    <>
                      <div className={`flex ${message.sender === localStorage.getItem('user_id') ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`message-box p-3 ${message.sender === localStorage.getItem('user_id') ? 'bg-orange-500 text-white rounded-tl-md rounded-bl-md' : 'bg-gray-300 text-black rounded-tr-md rounded-br-md'}`}>
                                      {breakStringIntoLines(message.content, 60).map((line, idx) => (
                                          <div key={idx}>{line}</div>
                                      ))}
                                  </div>
                              </div>
                      <div className={`message-date text-sm ${message.sender === localStorage.getItem('user_id') ? 'text-right mr-4' : 'text-left ml-2'}`}>
                          {new Date(message.localDateTime).toLocaleString()}
                      </div>
                    </>
                  )}
                  {message.type  === 'FILE' && (
                    <div className={`flex ${message.sender === localStorage.getItem('user_id') ? 'justify-end' : 'justify-start'}`}>
                        <div className={`message-box p-3 ${message.sender === localStorage.getItem('user_id') ? 'bg-orange-500 text-white rounded-tl-md rounded-bl-md' : 'bg-gray-300 text-black rounded-tr-md rounded-br-md'}`}>
                            <div>
                                <span>File: {message.fileName}</span>
                                <a href={`${config.apiURI}/downloadFile/${message.content}`} download={message.fileName}>
                                  Download
                                </a>
                            </div>
                        </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
              <div className="form-group">
                <div className="input-group relative">
                  <div className=" ml-6 mt-6 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-white text-xl font-semibold">
                      {localStorage.getItem('prenom')[0]}
                    </span>
                  </div>
                  <input
                    type="text"
                    id="message"
                    placeholder="votre message..."
                    autoComplete="off"
                    className="form-control rounded-full pl-12 pr-4 py-3"
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      id="fileInput" 
                      className="hidden" 
                    />
                    <label
                      htmlFor="fileInput" 
                      className="cursor-pointer absolute right-20 top-1 text-black rounded-full px-2 py-1 mr-2 mt-1 hover:bg-orange-500 transition-colors"
                    >
                      <FaCloudUploadAlt size={20} /> 
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`rounded-full px-4 py-2 ml-4 mt-1 ${
                      selectedClient ? 'bg-gray-300 text-black hover:bg-orange-500 transition-colors' : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                    disabled={!selectedClient}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  

}

export default Chat;
