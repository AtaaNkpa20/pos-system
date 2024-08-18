import React, { useState, useEffect } from 'react';
import './style/ViewInventory.css';
import logo from '../assets/Free-Logo.png';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const ViewInventory = () => {
  const [inventory, setInventory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch inventory data from the backend
    const fetchInventory = async () => {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/inventory');
      const data = await response.json();
      setInventory(data);
    };

    fetchInventory();
  }, []);

  return (
    <div className='view-inventory-container'>
      <header className="view-inventory-header">
        <img src={logo} alt="Logo" />
        <nav className="view-inventory-nav">
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

      <div className='view-inventory-content'>    
        <h2>View Inventory</h2>
        <table className='inventory-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₵)</th>
              <th>Size</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₵{item.price}</td>
                <td>{item.size}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewInventory;
