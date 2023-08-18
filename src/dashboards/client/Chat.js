import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../../Chat.css';
import Header from '../../components/Header';
import config from '../../config';

function Chat() {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const userId = localStorage.getItem('user_id');

  const fetchMessages = async () => {
    try {
      const response = await fetch(config.apiURI +`/messages?userId=${userId}`);
      console.log(response)
      const messages = await response.json();
      
      const chatMessages = messages.filter(message => message.type === 'CHAT');
      chatMessages.sort((a, b) => new Date(b.localDateTime) - new Date(a.localDateTime));
      setMessages(chatMessages);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    const socket = new SockJS(config.apiURI + '/ws');
    const client = new Client({ webSocketFactory: () => socket });

    client.activate();

    client.onConnect = () => {
      setStompClient(client);
      // Check if not already subscribed before subscribing
      if (!isSubscribed) {
        client.subscribe('/topic/public', onMessageReceived);
        setIsSubscribed(true);
      }
      onConnected();
    };

    client.onStompError = (error) => {
      console.log('STOMP Error:', error);
      onError();
    };

    // Fetch messages here
    fetchMessages();

    return () => {
      // Clean up and disconnect the socket when the component unmounts
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

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

  const sendMessage = (event) => {
    event.preventDefault();

    const messageContent = messageInput.trim();
    if (messageContent && stompClient && stompClient.connected) {
        
      const chatMessage = {
        senderId: localStorage.getItem('user_id'),
        content: messageInput
      };
      stompClient.publish({
        destination: "/app/client.chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
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


  return (
    <>
    <nav className="bg-white py-4 px-8 flex justify-end mr-14 mt-8">
      <Header />
    </nav>
    <div className="App">
      {
        <div id="chat-page">
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
              {messages && messages.map((message, index) => (
                  <li key={index} className={`mb-3 ${message.type === 'JOIN' || message.type === 'LEAVE' ? 'event-message' : 'chat-message'}`}>
                      {message.type === 'JOIN' && `${message.sender} joined!`}
                      {message.type === 'LEAVE' && `${message.sender} left!`}
                      {message.type === 'CHAT' && (
                          <>
                              <div className={`flex ${message.sender === localStorage.getItem('user_id') ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`message-box p-3 ${message.sender === localStorage.getItem('user_id') ? 'bg-orange-500 text-white rounded-tl-md rounded-bl-md' : 'bg-gray-300 text-black rounded-tr-md rounded-br-md'}`}>
                                      {breakStringIntoLines(message.content, 100).map((line, idx) => (
                                          <div key={idx}>{line}</div>
                                      ))}
                                  </div>
                              </div>
                              <div className={`message-date text-sm ${message.sender === localStorage.getItem('user_id') ? 'text-right' : 'text-left'}`}>
                                  {new Date(message.localDateTime).toLocaleString()}
                              </div>
                          </>
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
                  <button
                    type="submit"
                    className="bg-gray-300 text-black rounded-full px-4 py-2 ml-4 mt-1 hover:bg-orange-500 transition-colors"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
    </>
  );
}

export default Chat;
