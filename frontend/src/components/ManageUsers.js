import React, { useState, useEffect } from 'react';
import './style/ManageUsers.css';
import logo from '../assets/Free-Logo.png';
import { useNavigate } from 'react-router-dom';
import stocks from '../assets/stocks.png';
import coupon from '../assets/coupon.png';
import profit from '../assets/profit.png';
import group from '../assets/group.png';
import logout from '../assets/logout.png';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!username || !role) {
      setError('Both username and role are required.');
      return;
    }

    const newUser = { username, role };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
        setUsername('');
        setRole('');
        setError('');
        setSuccess('User added successfully.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add user');
        setSuccess('');
      }
    } catch (error) {
      console.error('Failed to add user:', error);
      setError('Failed to add user');
      setSuccess('');
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${username}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
        setError('');
        setSuccess('User deleted successfully.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete user');
        setSuccess('');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user');
      setSuccess('');
    }
  };

  return (
    <div className='manage-users-container'>
      <header className="manage-users-header">
        <img src={logo} alt="Logo" />
        <nav className="manage-users-nav">
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

      <main className="manage-users-content">
        <h2>Manage Users</h2>
        <div className="user-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <h3>Current Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="user-item">
              {user.username} - {user.role}
              <div>
                <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ManageUsers;
