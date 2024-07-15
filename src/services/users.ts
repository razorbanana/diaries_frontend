import api from './api';
import log from '../common/utils/logger';

export const getMyUser = async () => {
    log.info("GET /users/my")
    const response = await api.get('/users/my');
    return response.data;
}

export const patchMyUser = async (name: string, email: string, visible: boolean) => {
    log.info("PATCH /users/my")
    const body = {name, email, visible}
    const response = await api.patch('/users/my', body);
    return response.data;
}

export const deleteMyUser = async () => {
    log.info("DELETE /users/my")
    const response = await api.delete('/users/my');
    return response.data;
}