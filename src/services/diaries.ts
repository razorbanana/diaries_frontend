import api from './api';

export const getMyDiaries = async () => {
  console.log("GET /diaries/my")
  const response = await api.get('/diaries/my');
  return response.data;
}

export const getDiaryEntries = async (id: string) => {
  console.log("GET /entries/{id}")
  const response = await api.get(`/entries/${id}`);
  return response.data;
}