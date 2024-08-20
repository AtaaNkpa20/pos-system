// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};
