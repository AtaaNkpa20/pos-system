import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SalesContext } from '../SalesContext';
import './style/Sales.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const Sales = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sales } = useContext(SalesContext);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const currentDate = getCurrentDate();
  const dailySales = sales[currentDate] || [];

  console.log('Current date:', currentDate);
  console.log('Daily sales data:', dailySales);

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
            <img src={reciept} alt="Receipt Icon" className="nav-icon" />
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
        <h3>Sales for {currentDate}</h3>
        {dailySales.length === 0 ? (
          <p>No sales yet.</p>
        ) : (
          <ul className="sales-list">
            {dailySales.map((sale, index) => (
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
                    {Object.entries(sale).map(([name, { quantity, size, price }], idx) => (
                      name !== 'timestamp' && (
                        <tr key={idx}>
                          <td>{name}</td>
                          <td>{size}</td>
                          <td>{quantity}</td>
                          <td>₵{parseFloat(price).toFixed(2)}</td>
                          <td>₵{(quantity * parseFloat(price)).toFixed(2)}</td>
                        </tr>
                      )
                    ))}
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
