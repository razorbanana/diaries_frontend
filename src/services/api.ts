import axios from 'axios';
import log from '../common/utils/logger';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  log.info(`We are in interceptor. token: ${token ? true : false}`);
  if (token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  log.error(`Request interceptor error: ${error.message}`);
  return Promise.reject(error);
});

export default api;