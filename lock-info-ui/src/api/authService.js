import axios from 'axios';

// Server IP va Gateway portini ko'rsatamiz
const API_URL = 'http://170.168.6.99:8090/api/auth';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const verifyEmail = (token) => axios.get(`${API_URL}/activate?token=${token}`);