import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryType } from "../../common/types/entryType";
import { deleteEntry, getEntry, patchEntry } from "../../services/entries";
import  ConsoleLogger  from '../../common/utils/logger';
import { EditEntryFormInterface } from "../diaryEntries/editEntryFormSlice";

const log = new ConsoleLogger();

export const fetchEntry: any = createAsyncThunk('entry/fetchEntry', async (id:string) => {
    const response = await getEntry(id)
    log.info(`response in fetchEntry`)
    log.info(response)
    return response;
  });

export const updateMyEntry: any = createAsyncThunk('entry/updateEntry', async (formData: EditEntryFormInterface) => {
  const response = await patchEntry(formData.id, formData.title, formData.content)
  log.info(`response in patchDiary`)
  log.info(response)
  return response;
});

export const delEntry: any = createAsyncThunk('entry/deleteEntry', async (id:string) => {
    const response = await deleteEntry(id)
    log.info(`response in deleteEntry`)
    log.info(response)
    return response;
})

export interface EntryState {
    entry: EntryType;
    loading: boolean;
    error: string | null;
}

const initialState: EntryState = {
    entry: { 
      id: '', 
      title: '', 
      content: '', 
      createdAt : new Date().toISOString(),
      updatedAt : new Date().toISOString(),
      diaryId: '' 
    },
    loading: false,
    error: null,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    
  },
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
      .addCase(updateMyEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entry = action.payload
      })
      .addCase(updateMyEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(delEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delEntry.fulfilled, (state) => {
        state.loading = false;
        state.entry = initialState.entry;
      })
      .addCase(delEntry.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
  },
});

export default entrySlice.reducer;