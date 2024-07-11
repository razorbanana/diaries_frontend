import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryType } from "../../types/entryType";
import { getEntry } from "../../services/entries";

export const fetchEntry: any = createAsyncThunk('diaries/fetchEntry', async (id:string) => {
    const response = await getEntry(id)
    console.log(`response in fetchEntry`)
    console.log(response)
    return response;
  });

export interface EntryState {
    entry: EntryType;
    loading: boolean;
    error: string | null;
}

const initialState: EntryState = {
    entry: { id: '', title: '', content: '' },
    loading: false,
    error: null,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entry = action.payload;
      })
      .addCase(fetchEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default entrySlice.reducer;