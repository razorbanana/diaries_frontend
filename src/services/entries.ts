import api from './api';
import {FormData} from "../app/forms/entryFormSlice";

export const getEntry = async (id: string) => {
    console.log("GET /entries/single/{id}")
    const response = await api.get(`/entries/single/${id}`);
    return response.data;
}

export const deleteEntry = async (id: string) => {
    console.log("DELETE /entries/single/{id}")
    const response = await api.delete(`/entries/single/${id}`);
    return response.data;
}

export const createEntry = async (diaryId: string, formData: FormData) => {
    console.log("POST /entries/{diaryId}")
    const response = await api.post(`/entries/${diaryId}`, formData);
    return response.data;
}