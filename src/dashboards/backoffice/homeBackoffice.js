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
      <div className="bg-gray-800 w-1/6 p-4 h-screen fixed">
        <h1 className="text-white text-2xl font-bold mb-4">Banquier</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleButtonClick('accountList')}
            className={`${
              activeButton === 'accountList' ? 'bg-orange-400' : 'bg-gray-700'
            } hover:bg-orange-500 text-white py-2 px-4 rounded mb-4`}
          >
            Liste Comptes
          </button>
          <button
            onClick={() => handleButtonClick('notifications')}
            className={`${
              activeButton === 'notifications' ? 'bg-orange-400' : 'bg-gray-700'
            } hover:bg-orange-500 text-white py-2 px-4 rounded mb-4`}
          >
            Notifications
          </button>
          <button
            onClick={handleLogout}
            className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded"
          >
            logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-4 ml-auto">
        {activeButton === 'accountList' && <AccountList />}
        {activeButton === 'userList' && <AddAccountForm />} 
        {activeButton === 'notifications' && <Notifications userId={userId} />} 
      </div>
    </div>
  );
}

export default HomeBackoffice;
