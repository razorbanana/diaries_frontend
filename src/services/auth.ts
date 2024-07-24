import api from './api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  const token = response.data;
  return token;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/users/register', { email, password, name });
  return response.data;
};