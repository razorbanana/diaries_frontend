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

export function withErrorHandling(fn: Function) {
  return async function(...args: any[]) {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
          log.error("Unauthorized request")
          error.message = "Token is expired, please login again";
      }
      throw error;
  }
  };
}

export default api;