import log from '../common/utils/logger';
import api from './api';
import {withErrorHandling} from './api';

export const getMyDiaries = withErrorHandling(async () => {
  log.info("GET /diaries/my")
  const response = await api.get('/diaries/my');
  return response.data;
})

export const getDiaryEntries = withErrorHandling(async (id: string) => {
  log.info("GET /entries/{id}")
  const response = await api.get(`/entries/${id}`);
  return response.data;
})

export const createDiary = withErrorHandling(async (data: {title: string, description: string}) => {
  log.info("POST /diaries/my")
  const response = await api.post(`/diaries/my`, data);
  return response.data;
})

export const patchDiary = withErrorHandling(async (id: string, title: string, description: string, isPrivate: boolean) => {
  log.info("PATCH /diaries/my/{id}")
  const body = {title, description, isPrivate}
  const response = await api.patch(`/diaries/my/${id}`, body);
  return response.data;
})

export const deleteDiary = withErrorHandling(async (id: string) => {
  console.log(`DELETE /diaries/my/${id}`)
  const response = await api.delete(`/diaries/my/${id}`);
  return response.data;
})