import api from './api';

export const getMyDiaries = async () => {
  console.log("GET /diaries/my")
  const response = await api.get('/diaries/my');
  return response.data;
}