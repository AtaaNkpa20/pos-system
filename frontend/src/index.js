import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SalesProvider from './SalesContext'; // Import as default export

ReactDOM.render(
  <SalesProvider>
    <App />
  </SalesProvider>,
  document.getElementById('root')
);
