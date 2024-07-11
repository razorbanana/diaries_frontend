import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryType } from "../../types/entryType";
import { getDiaryEntries } from "../../services/diaries";

export const fetchDiaryEntries: any = createAsyncThunk('diaries/fetchDiaryEntries', async (id:string) => {
    const response = await getDiaryEntries(id)
    console.log(`response in fetchDiaryEntries`)
    console.log(response)
    return response;
  });

export interface DiaryEntriesState {
    entries: EntryType[];
    loading: boolean;
    error: string | null;
}

const initialState: DiaryEntriesState = {
    entries: [],
    loading: false,
    error: null,
};

const diaryEntriesSlice = createSlice({
  name: 'diaryEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        console.log(`action in diaryEntriesSlice`)
        console.log(action)
        state.entries = action.payload;
      })
      .addCase(fetchDiaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default diaryEntriesSlice.reducer;