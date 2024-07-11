import api from './api';

export const login = async (username: string, password: string) => {
  console.log('login service');
  const response = await api.post('/auth/login', { username, password });
  console.log('response', response);
  const token = response.data;
  return token;
};

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/users/register', { email, password, name });
  return response.data;
};