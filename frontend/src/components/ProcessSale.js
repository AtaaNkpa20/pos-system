import React, { useState, useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { SalesContext } from '../SalesContext'; // Import the SalesContext
import './style/Sales.css';
import logo from '../assets/Free-Logo.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import profit from '../assets/profit.png';
import group from '../assets/group.png';
import logout from '../assets/logout.png';

const ProcessSale = () => {
  const navigate = useNavigate();
  const { sales, setSales } = useContext(SalesContext); // Access sales and setSales from context
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    // Fetch sales data when component mounts
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


  return (
    <div className="sales-container">
      <header className="sales-header">
        <img src={logo} alt="Logo" />
        <nav className="sales-nav">
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
                    {sale.items ? (
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

export default ProcessSale;
