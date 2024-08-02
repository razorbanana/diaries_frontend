import api from './api';
import {EntryFormData} from "../app/diaryEntries/entryFormSlice";
import {withErrorHandling} from './api';


export const getEntry = withErrorHandling(async (id: string) => {
    const response = await api.get(`/entries/single/${id}`);
    return response.data;
})

export const patchEntry = withErrorHandling(async (id: string, title: string, content: string) => {
    const response = await api.patch(`/entries/single/${id}`, {title, content});
    return response.data;
})

export const deleteEntry = withErrorHandling(async (id: string) => {
    const response = await api.delete(`/entries/single/${id}`);
    return response.data;
})

export const createEntry = withErrorHandling(async (diaryId: string, formData: EntryFormData) => {
    const response = await api.post(`/entries/${diaryId}`, formData);
    return response.data;
})