import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SalesProvider from './SalesContext';  // Import as default

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '557808529536-c55sf15ckgc57aa3rdbiijuj4occ3jgo.apps.googleusercontent.com';  // Replace with your actual Client ID

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <SalesProvider>
        <App />
      </SalesProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
