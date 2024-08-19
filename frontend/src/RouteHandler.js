import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Import components
import Overview from './components/Overview';
import AdminLogin from './components/AdminLogin';
import CashierLogin from './components/CashierLogin';
import Home from './components/Home';
import Admin from './components/Admin';
import Settings from './components/Settings';
import Sales from './components/Sales';
import Customers from './components/Customers';
import Support from './components/Support';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import Cashier from './components/Cashier';
import AddUpdateInventory from './components/AddUpdateInventory';
import ViewProfitMargins from './components/ViewProfitMargins';
import ManageUsers from './components/ManageUsers';
import IssueReceipt from './components/IssueReceipt';
import ProcessSale from './components/ProcessSale';
import ChangeSettings from './components/ChangeSettings';
import ViewInventory from './components/ViewInventory';
import Details from './components/Details';

const RouteHandler = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [isLoggedIn, location.pathname]);

  useEffect(() => {
    const currentPath = localStorage.getItem('currentPath');
    if (isLoggedIn && currentPath) {
      navigate(currentPath);
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/adminlogin" element={isLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />} />
      <Route path="/cashierlogin" element={isLoggedIn ? <Navigate to="/home" /> : <CashierLogin onLogin={handleLogin} />} />
      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/" />} />
      <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/" />} />
      <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/" />} />
      <Route path="/viewinventory" element={isLoggedIn ? <ViewInventory /> : <Navigate to="/" />} />
      <Route path="/customers" element={isLoggedIn ? <Customers /> : <Navigate to="/" />} />
      <Route path="/support" element={isLoggedIn ? <Support /> : <Navigate to="/" />} />
      <Route path="/cashier" element={isLoggedIn ? <Cashier /> : <Navigate to="/" />} />
      <Route path="/addupdateinventory" element={isLoggedIn ? <AddUpdateInventory /> : <Navigate to="/" />} />
      <Route path="/viewprofitmargins" element={isLoggedIn ? <ViewProfitMargins /> : <Navigate to="/" />} />
      <Route path="/manageusers" element={isLoggedIn ? <ManageUsers /> : <Navigate to="/" />} />
      <Route path="/issuereceipt" element={isLoggedIn ? <IssueReceipt /> : <Navigate to="/" />} />
      <Route path="/processsale" element={isLoggedIn ? <ProcessSale /> : <Navigate to="/" />} />
      <Route path="/changesettings" element={isLoggedIn ? <ChangeSettings /> : <Navigate to="/" />} />
      <Route path="/details" element={isLoggedIn ? <Details /> : <Navigate to="/" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all redirect */}
    </Routes>
  );
};

export default RouteHandler;
