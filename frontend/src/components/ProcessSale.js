import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SalesContext } from '../SalesContext';
import './style/Sales.css';
import logo from '../assets/Free-Logo.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import profit from '../assets/profit.png';
import group from '../assets/group.png';
import logout from '../assets/logout.png';

const Sales = () => {
  const navigate = useNavigate();
  const { sales } = useContext(SalesContext);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const currentDate = getCurrentDate();
  const dailySales = sales[currentDate] || [];

  const handleDownload = () => {
    if (dailySales.length === 0) {
      alert('No sales data to download.');
      return;
    }

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header row
    csvContent += "Name,Size,Quantity,Price,Total\n";
    
    dailySales.forEach((sale, index) => {
      csvContent += `Sale ${index + 1} - ${sale.timestamp}\n`;
      Object.entries(sale).forEach(([name, { quantity, size, price }]) => {
        if (name !== 'timestamp') {
          csvContent += `${name},${size},${quantity},₵${parseFloat(price).toFixed(2)},₵${(quantity * parseFloat(price)).toFixed(2)}\n`;
        }
      });
      csvContent += "\n";
    });
    
    // Create a download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sales_report_${currentDate}.csv`);
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

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
        <h3>Sales for {currentDate}</h3>
        <button onClick={handleDownload} className="download-button">Download Sales</button>
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
