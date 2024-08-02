import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConsoleLogger from '../../common/utils/logger';
import { deleteComment, getComments, patchComment } from "../../services/comments";
import { CommentType } from "../../common/types/CommentType";

const log = new ConsoleLogger();

export const fetchComments: any = createAsyncThunk('comments/fetchComments', async (id:string) => {
    const response = await getComments(id)
    log.info(`response in fetchComments`)
    log.info(response)
    return response;
  });

export const updateComment: any = createAsyncThunk('comments/updateComment', async (comment: CommentType) => {
    const response = await patchComment(comment)
    log.info(`response in updateComment`)
      log.info(response)
      return response;
})

export const delComment: any = createAsyncThunk('comments/delComment', async (id: string) => {
  const response = await deleteComment(id)
  log.info(`response in delComment`)
    log.info(response)
    return response;
})

export interface CommentsState {
    comments: CommentType[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ comment: CommentType }>) => {
      state.comments = state.comments.concat(action.payload.comment);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const newEntries = state.comments.map(comment => comment.id === action.payload.id ? action.payload : comment)
        state.comments = newEntries
      })
      .addCase(delComment.fulfilled, (state, action) => {
        state.loading = false;
        const newEntries = state.comments.filter(comment => comment.id !== action.payload.id)
        state.comments = newEntries;
      })
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;