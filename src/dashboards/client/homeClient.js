/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from './AccountList';
import Notifications from './Notifications';
import Virement from './Virement';
import { FiList, FiBell, FiLogOut, FiCreditCard, FiUsers } from 'react-icons/fi';

function HomeBackoffice() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('user_id'); 
  

  useEffect(() => {
    if (!accessToken || role !== 'CLIENT') {
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
        <h1 className="text-white text-2xl font-bold mb-16">Client</h1>
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
            onClick={() => handleButtonClick('virements')}
            className={`${
              activeButton === 'virements' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiCreditCard className="inline-block mr-2" /> Virements
          </a>
          <a
            onClick={() => handleButtonClick('beneficiaires')}
            className={`${
              activeButton === 'beneficiaires' ? 'text-orange-400' : 'text-gray-400'
            } hover:text-orange-500 `}
            role="button"
          >
            <FiUsers className="inline-block mr-2" /> Bénéficiaires
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
        {activeButton === 'notifications' && <Notifications userId={userId} />} 
        {activeButton === 'virements' && <Virement />} 
        {activeButton === 'beneficiaires' && <Virement />} 
      </div>
    </div>
  );
}

export default HomeBackoffice;
