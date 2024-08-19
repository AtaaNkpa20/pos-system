// src/components/Support.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Support.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="support-container">
      <header className="support-header">
      <img src={logo} alt="Logo" />
        <nav className="support-nav">
        <div className="nav-item" onClick={() => navigate('/home')}>
            <img src={home} alt="Home Icon" className="nav-icon" />
            <button>Dashboard</button>
          </div> 

          <div className="nav-item" onClick={() => navigate('/viewinventory')}>
            <img src={stocks} alt="Inventory Icon" className="nav-icon" />
            <button>Inventory</button>
          </div> 

          <div className="nav-item" onClick={() => navigate('/sales')}>
            <img src={coupon} alt="Sale Icon" className="nav-icon" />
            <button>Sales</button>
          </div>           
          <div className="nav-item" onClick={() => navigate('/issuereceipt')}>
            <img src={reciept} alt="Receipt Icon" className="nav-icon" />
            <button>Issue Receipt</button>
          </div> 

          <div className="nav-item" onClick={() => navigate('/Customers')}>
            <img src={group} alt="Customers Icon" className="nav-icon" />
            <button>Customers</button>
          </div>           

          <div className="nav-item" onClick={() => navigate('/support')}>
            <img src={help} alt="Help Icon" className="nav-icon" />
            <button>Help & Support</button>
          </div> 
          <div className="nav-item" onClick={() => navigate('/logout')}>
            <img src={logout} alt="Logout Icon" className="nav-icon" />
            <button>Logout</button>
          </div> 
            <p>© 2024 POS System. All rights reserved.</p>
        </nav>
      </header>
      <main className="support-content">
        <p>Support information and FAQs will be displayed here.</p>
      </main>
    </div>
  );
};

export default Support;
