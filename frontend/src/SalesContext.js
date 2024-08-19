import React, { createContext, useState } from 'react';

// Create the SalesContext
export const SalesContext = createContext();

const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const addSale = (newSale) => {
    const updatedSales = [...sales, { ...newSale, timestamp: new Date().toLocaleString() }];
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
