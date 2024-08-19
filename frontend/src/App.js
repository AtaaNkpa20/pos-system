import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

// Import components
import Overview from './components/Overview';
import AdminLogin from './components/AdminLogin';
import CashierLogin from './components/CashierLogin';
import Home from './components/Home';
import Settings from './components/Settings';
import Sales from './components/Sales';
import Customers from './components/Customers';
import Support from './components/Support';
import Logout from './components/Logout';
import AddUpdateInventory from './components/AddUpdateInventory';
import ViewProfitMargins from './components/ViewProfitMargins';
import ManageUsers from './components/ManageUsers';
import IssueReceipt from './components/IssueReceipt';
import ProcessSale from './components/ProcessSale';
import ViewInventory from './components/ViewInventory';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <RouteHandler isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </Router>
  );
};

const RouteHandler = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [isLoggedIn, location.pathname]);

  useEffect(() => {
    const currentPath = localStorage.getItem('currentPath');
    if (isLoggedIn && currentPath) {
      window.history.replaceState(null, '', currentPath);
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/adminlogin" element={isLoggedIn ? <Navigate to="/addupdateinventory" /> : <AdminLogin onLogin={handleLogin} />} />
      <Route path="/cashierlogin" element={isLoggedIn ? <Navigate to="/home" /> : <CashierLogin onLogin={handleLogin} />} />
      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/" />} />
      <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/" />} />
      <Route path="/viewinventory" element={isLoggedIn ? <ViewInventory /> : <Navigate to="/" />} />
      <Route path="/customers" element={isLoggedIn ? <Customers /> : <Navigate to="/" />} />
      <Route path="/support" element={isLoggedIn ? <Support /> : <Navigate to="/" />} />
      <Route path="/addupdateinventory" element={isLoggedIn ? <AddUpdateInventory /> : <Navigate to="/" />} />
      <Route path="/viewprofitmargins" element={isLoggedIn ? <ViewProfitMargins /> : <Navigate to="/" />} />
      <Route path="/manageusers" element={isLoggedIn ? <ManageUsers /> : <Navigate to="/" />} />
      <Route path="/issuereceipt" element={isLoggedIn ? <IssueReceipt /> : <Navigate to="/" />} />
      <Route path="/processsale" element={isLoggedIn ? <ProcessSale /> : <Navigate to="/" />} />
      <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all redirect */}
    </Routes>
  );
};

export default App;
