import { PostCommentFormData } from '../app/forms/postCommentFormSlice';
import api from './api';
import {withErrorHandling} from './api';

export const createComment = withErrorHandling(async (entryId: string, formData: PostCommentFormData) => {
    const dataToSend = {
        content: formData.content,
        entryId
    }
    const response = await api.post(`/comments`, dataToSend);
    return response.data;
})