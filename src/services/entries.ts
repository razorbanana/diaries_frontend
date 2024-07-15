import api from './api';
import {EntryFormData} from "../app/forms/entryFormSlice";
import log from '../common/utils/logger';
import {withErrorHandling} from './api';


export const getEntry = withErrorHandling(async (id: string) => {
    log.info("GET /entries/single/{id}")
    const response = await api.get(`/entries/single/${id}`);
    return response.data;
})

export const deleteEntry = withErrorHandling(async (id: string) => {
    log.info("DELETE /entries/single/{id}")
    const response = await api.delete(`/entries/single/${id}`);
    return response.data;
})

export const createEntry = withErrorHandling(async (diaryId: string, formData: EntryFormData) => {
    log.info("POST /entries/{diaryId}")
    const response = await api.post(`/entries/${diaryId}`, formData);
    return response.data;
})