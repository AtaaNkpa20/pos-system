import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SalesContext } from '../SalesContext'; // Import the SalesContext
import './style/Sales.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import receipt from '../assets/reciept.png'; // Fixed spelling of 'receipt'
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const Sales = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { sales, setSales } = useContext(SalesContext); // Access sales and setSales from context
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    // Fetch sales data when component mounts or searchDate changes
    const fetchSales = async () => {
      try {
        const response = await fetch(`/api/sales?date=${searchDate}`);
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Failed to fetch sales:', error);
      }
    };

    fetchSales();
  }, [searchDate, setSales]); // Depend on searchDate to refetch data

  const handleNavigate = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className="sales-container">
      <header className="sales-header">
        <img src={logo} alt="Logo" />
        <nav className="sales-nav">
          <div className="nav-item" onClick={() => handleNavigate('/home')}>
            <img src={home} alt="Home Icon" className="nav-icon" />
            <button>Dashboard</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/viewinventory')}>
            <img src={stocks} alt="Inventory Icon" className="nav-icon" />
            <button>Inventory</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/sales')}>
            <img src={coupon} alt="Sale Icon" className="nav-icon" />
            <button>Sales</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/issuereceipt')}>
            <img src={receipt} alt="Receipt Icon" className="nav-icon" />
            <button>Issue Receipt</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/customers')}>
            <img src={group} alt="Customers Icon" className="nav-icon" />
            <button>Customers</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/support')}>
            <img src={help} alt="Help Icon" className="nav-icon" />
            <button>Help & Support</button>
          </div>
          <div className="nav-item" onClick={() => handleNavigate('/logout')}>
            <img src={logout} alt="Logout Icon" className="nav-icon" />
            <button>Logout</button>
          </div>
          <p>© 2024 POS System. All rights reserved.</p>
        </nav>
      </header>
      <main className="sales-content">
        <h3>Sales</h3>
        <div className="search-bar">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        {sales.length === 0 ? (
          <p>No sales found for the selected date.</p>
        ) : (
          <ul className="sales-list">
            {sales.map((sale, index) => (
              <li key={index} className="sale-item">
                <h4>Sale {index + 1} - {sale.timestamp}</h4>
                <table className="sale-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.items && sale.items.length > 0 ? (
                      sale.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.size}</td>
                          <td>{item.quantity}</td>
                          <td>₵{parseFloat(item.price).toFixed(2)}</td>
                          <td>₵{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No items available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Sales;
