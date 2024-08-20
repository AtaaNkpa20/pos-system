import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SalesContext } from '../SalesContext';
import './style/Home.css';
import logo from '../assets/Free-Logo.png';
import home from '../assets/home.png';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import reciept from '../assets/reciept.png';
import group from '../assets/group.png';
import help from '../assets/help.png';
import logout from '../assets/logout.png';

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0); // New state for discount
  const navigate = useNavigate();
  const { addSale } = useContext(SalesContext);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (medicine, quantity) => {
    if (quantity > 0) {
      setSelectedMedicines(prevSelected => ({
        ...prevSelected,
        [medicine.name]: { ...medicine, quantity }
      }));
    } else {
      handleDeleteSelected(medicine.name);
    }
  };

  const handleDeleteSelected = (medicineName) => {
    setSelectedMedicines(prevSelected => {
      const newSelected = { ...prevSelected };
      delete newSelected[medicineName];
      return newSelected;
    });
  };

  const calculateTotal = () => {
    const subtotal = Object.values(selectedMedicines).reduce((total, { quantity, price }) => {
      return total + (quantity * price);
    }, 0);
    return subtotal - (subtotal * (discount / 100)); // Apply discount
  };

  const handleCompleteSale = () => {
    addSale(selectedMedicines, discount); // Include discount in the sale
    setSelectedMedicines({});
    setDiscount(0); // Reset discount after sale
    navigate('/sales');
  };

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Filter the medicines based on the search query
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-top">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="home-nav">
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

      <div className="top">
        <div className="top-header">
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

        <main className="home-content">
          <div className="agric-med">
            <h3>Agricultural Medicines</h3>
            <ul className="medicines-list">
              {filteredMedicines.map((medicine, index) => (
                <li key={index} className="medicine-item">
                  <span>{medicine.name} - ₵{medicine.price} </span>
                  <input
                    type="number"
                    min="0"
                    max={medicine.stock}
                    placeholder="Qty"
                    value={selectedMedicines[medicine.name]?.quantity || ''}
                    onChange={(e) => handleQuantityChange(medicine, parseInt(e.target.value))}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="select-med">
            <h3>Selected Medicines</h3>
            <table className="selected-medicines-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedMedicines).map(([name, { quantity, size, price }], index) => (
                  <tr key={index} className="selected-medicine-item">
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{size}</td>
                    <td>₵{(quantity * price).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleDeleteSelected(name)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="complete">
              <h4>Total: ₵{calculateTotal().toFixed(2)}</h4>
              <div className="discount-input">
                <label>Discount (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                />
              </div>
              <button onClick={handleCompleteSale}>Sale</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
