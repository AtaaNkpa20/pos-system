import React, { createContext, useState, useEffect } from 'react';

// Create the SalesContext
export const SalesContext = createContext();

// Function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const SalesProvider = ({ children }) => {
  // Initialize sales from localStorage or an empty object
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
      console.log('Loaded sales from localStorage:', JSON.parse(savedSales));
      return JSON.parse(savedSales);
    } else {
      console.log('No sales found in localStorage');
      return {};
    }
  });

  // Function to add a new sale and persist it in localStorage
  const addSale = (newSale) => {
    const date = getCurrentDate();
    const updatedSales = {
      ...sales,
      [date]: [...(sales[date] || []), { ...newSale, timestamp: new Date().toLocaleString() }]
    };
    console.log('Adding new sale:', updatedSales);
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
  };

  useEffect(() => {
    // This effect could handle daily reset or other management tasks
  }, [sales]);

  return (
    <SalesContext.Provider value={{ sales, setSales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
