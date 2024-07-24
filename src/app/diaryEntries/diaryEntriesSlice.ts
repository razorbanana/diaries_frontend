import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntryType } from "../../common/types/entryType";
import { getDiaryEntries } from "../../services/diaries";
import ConsoleLogger from '../../common/utils/logger';

const log = new ConsoleLogger();

export const fetchDiaryEntries: any = createAsyncThunk('diaryEntries/fetchDiaryEntries', async (id:string) => {
    const response = await getDiaryEntries(id)
    log.info(`response in fetchDiaryEntries`)
    log.info(response)
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
  reducers: {
    addEntry: (state, action: PayloadAction<{ entry: EntryType }>) => {
      state.entries = state.entries.concat(action.payload.entry);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchDiaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addEntry } = diaryEntriesSlice.actions;

export default diaryEntriesSlice.reducer;