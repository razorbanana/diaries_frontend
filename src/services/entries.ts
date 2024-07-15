import api from './api';
import {EntryFormData} from "../app/forms/entryFormSlice";
import log from '../common/utils/logger';


export const getEntry = async (id: string) => {
    log.info("GET /entries/single/{id}")
    const response = await api.get(`/entries/single/${id}`);
    return response.data;
}

export const deleteEntry = async (id: string) => {
    log.info("DELETE /entries/single/{id}")
    const response = await api.delete(`/entries/single/${id}`);
    return response.data;
}

export const createEntry = async (diaryId: string, formData: EntryFormData) => {
    log.info("POST /entries/{diaryId}")
    const response = await api.post(`/entries/${diaryId}`, formData);
    return response.data;
}