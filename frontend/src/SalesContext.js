import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SalesContext = createContext();

const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales from the database when the component mounts
    const fetchSales = async () => {
      try {
        const response = await axios.get('/api/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  const addSale = async (newSale) => {
    try {
      // Save sale to the database
      const response = await axios.post('/api/sales', newSale);
      
      // Update local state with the new sale
      setSales(prevSales => [...prevSales, response.data]);
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
