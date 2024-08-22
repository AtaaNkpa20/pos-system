import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SalesProvider from './SalesContext';  // Import as default



ReactDOM.render(
  <React.StrictMode>
      <SalesProvider>
        <App />
      </SalesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
