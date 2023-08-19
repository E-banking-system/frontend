/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from './AccountList';
import Notifications from './Notifications';
import Clients from './Clients';
import Profile from './Profile';
import Settings from './Settings';
import Chat from './Chat';
import { FiHome,FiCreditCard, FiBell, FiLogOut, FiUsers, FiUser, FiSettings, FiMessageSquare} from 'react-icons/fi';
import Acceuil from './Acceuil';

function HomeBackoffice() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('user_id'); 

  const initialActiveButton = localStorage.getItem('activeButton') || 'home';
  

  useEffect(() => {
    if (!accessToken || role !== 'BANQUIER') {
      navigate('/');
    }
  }, [accessToken, role, navigate]);

  const [activeButton, setActiveButton] = useState(initialActiveButton);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    localStorage.setItem('activeButton', buttonName); 
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 p-4 h-screen fixed" style={{ width: '180px', padding: '1rem' }}>
        <h1 className="text-white text-2xl font-bold mb-16">Banquier</h1>
        <div className="flex flex-col space-y-4">
          <a
            onClick={() => handleButtonClick('home')}
            className={`${
              activeButton === 'home' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiHome className="inline-block mr-2" /> Acceuil
          </a>
          <a
            onClick={() => handleButtonClick('accountList')}
            className={`${
              activeButton === 'accountList' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiCreditCard className="inline-block mr-2" /> Comptes
          </a>
          <a
            onClick={() => handleButtonClick('notifications')}
            className={`${
              activeButton === 'notifications' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiBell className="inline-block mr-2" /> Notifications
          </a>
          <a
            onClick={() => handleButtonClick('clients')}
            className={`${
              activeButton === 'clients' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiUsers className="inline-block mr-2" /> Clients
          </a>
          <a
            onClick={() => handleButtonClick('profile')}
            className={`${
              activeButton === 'profile' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiUser className="inline-block mr-2" /> Profile
          </a>
          <a
            onClick={() => handleButtonClick('chat')}
            className={`${
              activeButton === 'chat' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiMessageSquare className="inline-block mr-2" /> Chat
          </a>
          <a
            onClick={() => handleButtonClick('parametres')}
            className={`${
              activeButton === 'parametres' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiSettings className="inline-block mr-2" /> Paramètres
          </a>
          <a
            onClick={handleLogout}
            className="text-gray-400 hover:text-orange-500  "
            role="button"
          >
            <FiLogOut className="inline-block mr-2" /> logout
          </a>
        </div>
      </div>

      
      {/* Main Content */}
      <div className={`${activeButton === 'accountList' ? 'flex-grow justify-center w-6/8 p-4 ml-44' : activeButton === 'chat' ? 'w-3/4 ml-64' : ' flex-grow justify-center'}`}>
        {activeButton === 'home' && <Acceuil />}
        {activeButton === 'accountList' && <AccountList />}
        {activeButton === 'clients' && <Clients /> } 
        {activeButton === 'notifications' && <Notifications userId={userId} />} 
        {activeButton === 'profile' && <Profile /> } 
        {activeButton === 'parametres' && <Settings /> } 
        {activeButton === 'chat' && <Chat /> } 
      </div>
    </div>
  );
}

export default HomeBackoffice;
