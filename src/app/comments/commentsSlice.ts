import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConsoleLogger from '../../common/utils/logger';
import { getComments } from "../../services/comments";
import { CommentType } from "../../common/types/CommentType";

const log = new ConsoleLogger();

export const fetchComments: any = createAsyncThunk('comments/fetchComments', async (id:string) => {
    const response = await getComments(id)
    log.info(`response in fetchComments`)
    log.info(response)
    return response;
  });

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
    //   .addCase(updateMyEntry.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const newEntries = state.entries.map(entry => entry.id === action.payload.id ? action.payload : entry)
    //     state.entries = newEntries
    //   })
    //   .addCase(delEntry.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const newEntries = state.entries.filter(entry => entry.id !== action.payload.id)
    //     state.entries = newEntries;
    //   })
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;