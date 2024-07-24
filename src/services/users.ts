import api from './api';
import {withErrorHandling} from './api';

export const getMyUser = withErrorHandling(async () => {
    const response = await api.get('/users/my');
    return response.data;
})

export const updateUserPassword = withErrorHandling(async (oldPassword: string, newPassword: string) => {
    const body = {oldPassword, newPassword}
    const response = await api.patch('/users/password', body);
    return response.data;
})

export const patchMyUser = withErrorHandling(async (name: string, email: string, visible: boolean) => {
    const body = {name, email, visible}
    const response = await api.patch('/users/my', body);
    return response.data;
})

export const deleteMyUser = withErrorHandling(async () => {
    const response = await api.delete('/users/my');
    return response.data;
})