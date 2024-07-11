import api from './api';

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
