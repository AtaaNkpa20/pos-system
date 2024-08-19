// src/components/Customers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Customers.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddUpdateCustomer = async () => {
    const newCustomer = { id: customerId, name: customerName, email: customerEmail, phone: customerPhone };

    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const updatedCustomers = await response.json();
        setCustomers(updatedCustomers);
        setCustomerId('');
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add/update customer');
      }
    } catch (error) {
      console.error('Failed to add/update customer:', error);
      setError('Failed to add/update customer');
    }
  };

  const handleEditCustomer = (customer) => {
    setCustomerId(customer.id);
    setCustomerName(customer.name);
    setCustomerEmail(customer.email);
    setCustomerPhone(customer.phone);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedCustomers = await response.json();
        setCustomers(updatedCustomers);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete customer');
      }
    } catch (error) {
      console.error('Failed to delete customer:', error);
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="customers-container">
      <header className="customers-header">
        <img src={logo} alt="Logo" />
        <nav className="customers-nav">
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
      <main className="customers-content">
        <h2>Manage Customers</h2>
        <div>
          <label>Customer ID:</label>
          <input
            type="number"
            min='0'
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <label>Customer Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Customer Phone:</label>
          <input
            type="number"
            min='0'
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        <button onClick={handleAddUpdateCustomer}>Add/Update </button>
        {error && <p className="error">{error}</p>}
        <h3>Current Customers</h3>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              {customer.name} - {customer.email} (Phone: {customer.phone})
              <div>
                <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Customers;
