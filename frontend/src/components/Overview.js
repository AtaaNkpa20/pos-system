import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Overview.css';

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="overview-container">
    <h1>Welcome To KOBOWISE</h1>
    <button onClick={() => navigate('/adminlogin')}>Admin</button>
    <button onClick={() => navigate('/cashierlogin')}>Cashier</button>
      <main className="overview-content">
      </main>

      <p>© 2024 POS System. All rights reserved.</p>

    </div>
  );
};

export default Overview;
