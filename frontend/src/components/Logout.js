// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Logout.css';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate('/');
  }, [onLogout, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
