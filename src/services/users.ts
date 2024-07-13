import api from './api';

export const getMyUser = async () => {
    console.log("GET /users/my")
    const response = await api.get('/users/my');
    return response.data;
}

export const patchMyUser = async (name: string, email: string, visible: boolean) => {
    console.log("PATCH /users/my")
    const body = {name, email, visible}
    const response = await api.patch('/users/my', body);
    return response.data;
}

export const deleteMyUser = async () => {
    console.log("DELETE /users/my")
    const response = await api.delete('/users/my');
    return response.data;
}