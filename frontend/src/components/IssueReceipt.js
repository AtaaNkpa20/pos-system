import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Receipt.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const IssueReceipt = ({ sale }) => {
  const [receipt, setReceipt] = useState('');
  const navigate = useNavigate();

  const handleIssueReceipt = () => {
    if (!sale) {
      alert('Sale data is missing.');
      return;
    }

    // Format receipt content
    const receiptContent = `
      <div>
        <h1>Receipt</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Receipt #:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sale.id || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Staff Name:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sale.staffName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Date:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;" colspan="3">${sale.date || 'N/A'}</td>
          </tr>
        </table>
        <h2>Items:</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Unit Price</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Qty</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${sale.items?.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.price.toFixed(2)}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('') || '<tr><td colspan="4" style="border: 1px solid #ddd; padding: 8px;">No items</td></tr>'}
            <tr>
              <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${sale.total?.toFixed(2) || '0.00'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Set receipt state
    setReceipt(receiptContent);
  };

  const handlePrint = () => {
    if (!receipt) {
      alert('No receipt to print.');
      return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div>
            ${receipt}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className='receipt-container'>
      <header className="receipt-header">
        <img src={logo} alt="Logo" />
        <nav className="receipt-nav">
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

      <div className='receipt-content'>
        <h2>Issue Receipt</h2>
        <button onClick={handleIssueReceipt}>Generate Receipt</button>
        {receipt && (
          <>
            <div dangerouslySetInnerHTML={{ __html: receipt }} />
            <button onClick={handlePrint}>Print Receipt</button>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueReceipt;
