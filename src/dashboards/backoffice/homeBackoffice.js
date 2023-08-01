/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from './AccountList';
import AddAccountForm from './AddAccountForm';
import Notifications from './Notifications'

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
            Liste Comptes
          </a>
          <a
            onClick={() => handleButtonClick('notifications')}
            className={`${
              activeButton === 'notifications' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            Notifications
          </a>
          <a
            onClick={handleLogout}
            className="text-gray-400 hover:text-orange-500  "
            role="button"
          >
            logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-5/6 ml-auto">
        {activeButton === 'accountList' && <AccountList />}
        {activeButton === 'notifications' && <Notifications userId={userId} />} 
      </div>
    </div>
  );
}

export default HomeBackoffice;
