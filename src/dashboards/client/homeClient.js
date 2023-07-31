import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeClient() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!accessToken || role !== 'CLIENT') {
      navigate('/');
    }
  }, [accessToken, role, navigate]);

  return (
    <div>
      <h1>Hello, client!</h1>
    </div>
  );
}

export default HomeClient;
