import { PostCommentFormData } from '../app/comments/postCommentFormSlice';
import { CommentType } from '../common/types/CommentType';
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

export const getComments = withErrorHandling(async (entryId: string) => {
    const response = await api.get(`/comments/${entryId}`);
    return response.data;
})

export const patchComment = withErrorHandling(async (comment: CommentType) => {
    const response = await api.patch(`/comments/${comment.id}`, comment);
    return response.data;
})

export const deleteComment = withErrorHandling(async (commentId: string) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
})