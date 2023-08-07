/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from './AccountList';
import Notifications from './Notifications';
import Clients from './Clients';
import { FiList, FiBell, FiLogOut, FiUsers} from 'react-icons/fi';

function HomeBackoffice() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('user_id'); 
  

  useEffect(() => {
    if (!accessToken || role !== 'BANQUIER') {
      navigate('/');
    }
  }, [accessToken, role, navigate]);

  const [activeButton, setActiveButton] = useState('accountList');
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 p-4 h-screen fixed" style={{ width: '180px', padding: '1rem' }}>
        <h1 className="text-white text-2xl font-bold mb-16">Banquier</h1>
        <div className="flex flex-col space-y-4">
          <a
            onClick={() => handleButtonClick('accountList')}
            className={`${
              activeButton === 'accountList' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiList className="inline-block mr-2" /> Comptes
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
            onClick={handleLogout}
            className="text-gray-400 hover:text-orange-500  "
            role="button"
          >
            <FiLogOut className="inline-block mr-2" /> logout
          </a>
        </div>
      </div>

      
      {/* Main Content */}
      <div className={`${activeButton === 'accountList' ? 'w-6/8 p-4 ml-auto' : ' flex-grow justify-center'}`}>
        {activeButton === 'accountList' && <AccountList />}
        {activeButton === 'beneficiaires' && <Clients /> } 
        {activeButton === 'notifications' && <Notifications userId={userId} />} 
      </div>
    </div>
  );
}

export default HomeBackoffice;
