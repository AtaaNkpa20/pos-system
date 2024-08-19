// src/components/Admin/ViewProfitMargins.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Profit.css';
import logo from '../assets/Free-Logo.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import profit from '../assets/profit.png';
import group from '../assets/group.png';
import logout from '../assets/logout.png';


const ViewProfitMargins = () => {
  const [profitMargins, setProfitMargins] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profit margins data from the backend
    const fetchProfitMargins = async () => {
      // Replace with your actual API endpoint
      const response = await fetch('/api/profit-margins');
      const data = await response.json();
      setProfitMargins(data);
    };

    fetchProfitMargins();
  }, []);

  return (
    <div className='profit-container'>
      <header className="profit-header">
      <img src={logo} alt="Logo" />
        <nav className="profit-nav">
          <div className="nav-item" onClick={() => navigate('/addupdateinventory')}>
            <img src={stocks} alt="Inventory Icon" className="nav-icon" />
            <button>Inventory</button>
          </div>
          <div className="nav-item" onClick={() => navigate('/processsale')}>
            <img src={coupon} alt="Sales Icon" className="nav-icon" />
            <button>Cashier Sales</button>
          </div>
          <div className="nav-item" onClick={() => navigate('/viewprofitmargins')}>
            <img src={profit} alt="Profit Margins Icon" className="nav-icon" />
            <button>Profit Margins</button>
          </div>
          <div className="nav-item" onClick={() => navigate('/manageusers')}>
            <img src={group} alt="Manage Users Icon" className="nav-icon" />
            <button>Manage Users</button>
          </div>
          <div className="nav-item" onClick={() => navigate('/logout')}>
            <img src={logout} alt="Logout Icon" className="nav-icon" />
            <button>Logout</button>
          </div>
            <p>© 2024 POS System. All rights reserved.</p>
        </nav>
      </header>
  
      <div className='profit-content'>
      <h2>View Profit Margins</h2>
      <ul>
        {profitMargins.map((margin, index) => (
          <li key={index}>{margin}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ViewProfitMargins;
