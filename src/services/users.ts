import api from './api';
import log from '../common/utils/logger';
import {withErrorHandling} from './api';

export const getMyUser = withErrorHandling(async () => {
        log.info("GET /users/my")
        const response = await api.get('/users/my');
        return response.data;
})

export const patchMyUser = withErrorHandling(async (name: string, email: string, visible: boolean) => {
    log.info("PATCH /users/my")
        const body = {name, email, visible}
        const response = await api.patch('/users/my', body);
        return response.data;
})

export const deleteMyUser = withErrorHandling(async () => {
    log.info("DELETE /users/my")
    const response = await api.delete('/users/my');
    return response.data;
})