import axios from 'axios';
import ConsoleLogger from '../common/utils/logger';

const logger = new ConsoleLogger();

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  logger.info(`${config.method} ${config.url}`);
  logger.info(config.data)
  if (token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  logger.error(`Request interceptor error: ${error.message}`);
  return Promise.reject(error);
});

export function withErrorHandling(fn: Function) {
  return async function(...args: any[]) {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logger.error("Unauthorized request")
          error.message = "Token is expired, please login again";
      }
      throw error;
  }
  };
}

export default api;