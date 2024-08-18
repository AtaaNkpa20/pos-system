import React, { useState, useEffect } from 'react';
import './style/AddUpdateInventory.css';
import logo from '../assets/Free-Logo.png';
import { useNavigate } from 'react-router-dom';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import profit from '../assets/profit.png';
import group from '../assets/group.png';
import logout from '../assets/logout.png';
import plus from '../assets/plus.png';
import close from '../assets/close.png';

const AddUpdateInventory = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [itemStock, setItemStock] = useState('');
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();
        if (Array.isArray(data)) {
          setInventory(data);
        } else {
          setInventory([]);
        }
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        setInventory([]);
      }
    };

    fetchInventory();
  }, []);

  const handleAddUpdate = async () => {
    // Ensure price and stock are not negative
    if (itemPrice < 0 || itemStock < 0) {
      setError('Price and stock cannot be negative.');
      return;
    }
  
    // Ensure required fields are filled
    if (!itemName || !itemPrice || !itemSize || !itemStock) {
      setError('All fields must be filled out.');
      return;
    }
  
    const newItem = { name: itemName, price: itemPrice, size: itemSize, stock: itemStock };
  
    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
  
      if (response.ok) {
        const updatedInventory = await response.json();
        setInventory(updatedInventory);
        setItemName('');
        setItemPrice('');
        setItemSize('');
        setItemStock('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add/update item');
      }
    } catch (error) {
      console.error('Failed to add/update item:', error);
      setError('Failed to add/update item');
    }
  };
  

  const handleUpdate = (item) => {
    setItemName(item.name);
    setItemPrice(item.price);
    setItemSize(item.size);
    setItemStock(item.stock);
  };

  const handleDelete = async (itemName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${encodeURIComponent(itemName)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedInventory = await response.json();
        setInventory(updatedInventory);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      setError('Failed to delete item');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='add-update-container'>
      <header className="add-update-header">
        <img src={logo} alt="Logo" />
        <nav className="add-update-nav">
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

      <div className='top'>
        <div className='top-header'>
          <p className="date-time">{formatDateTime(dateTime)}</p>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by item name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
        </div>

        <main className="add-update-content">
          <div className='list'>
            <h3>Add/Update Inventory</h3>
            <div>
              <label>Item Name:</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div>
              <label>Item Price (₵):</label>
              <input
                type="number"
                min='0'
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Item Size:</label>
              <input
                type="text"
                value={itemSize}
                onChange={(e) => setItemSize(e.target.value)}
              />
            </div>
            <div>
              <label>Item Stock:</label>
              <input
                type="number"
                min='0'
                value={itemStock}
                onChange={(e) => setItemStock(e.target.value)}
              />
            </div>
            <button onClick={handleAddUpdate}>Add/Update Item</button>
            {error && <p className="error">{error}</p>}
          </div>

          <div className='current'>
            <h3>Current Inventory</h3>

            <ul>
              {Array.isArray(filteredInventory) && filteredInventory.map((item, index) => (
                <li key={index} className="inventory-item">
                <div className='box'>
                  <div>
                    <p>Name: {item.name} </p>
                    <p>Price: ₵{item.price} </p>
                    <p>Size: {item.size} </p>
                    <p>Stock: {item.stock}</p> 
                  </div>
                  <div className='changes'>
                    <img src={plus} alt="Edit" onClick={() => handleUpdate(item)}></img>
                    <img src={close} alt="Delete" onClick={() => handleDelete(item.name)}></img>
                  </div>
                </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUpdateInventory;
