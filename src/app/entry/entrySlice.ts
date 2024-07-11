import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryType } from "../../types/entryType";
import { deleteEntry, getEntry } from "../../services/entries";

export const fetchEntry: any = createAsyncThunk('entry/fetchEntry', async (id:string) => {
    const response = await getEntry(id)
    console.log(`response in fetchEntry`)
    console.log(response)
    return response;
  });

export const delEntry: any = createAsyncThunk('entry/deleteEntry', async (id:string) => {
    const response = await deleteEntry(id)
    console.log(`response in deleteEntry`)
    console.log(response)
    return response;
})

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
      })
      .addCase(delEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delEntry.fulfilled, (state) => {
        state.loading = false;
        state.entry = { id: '', title: '', content: '' };
      })
      .addCase(delEntry.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
  },
});

export default entrySlice.reducer;