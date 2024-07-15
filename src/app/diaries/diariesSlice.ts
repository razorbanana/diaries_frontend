import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiaryType } from "../../common/types/diaryType";
import { deleteDiary, getMyDiaries } from "../../services/diaries";
import log from '../../common/utils/logger';

export const fetchDiaries: any = createAsyncThunk('diaries/fetchDiaries', async () => {
    const response = await getMyDiaries()
    log.info(`response in fetchDiaries`)
    log.info(response)
    return response;
  });

export const delDiary: any = createAsyncThunk('entry/deleteDiary', async (id:string) => {
    const response = await deleteDiary(id)
    log.info(`response in deleteEntry`)
    log.info(response)
    return response;
})

export interface DiariesState {
    diaries: DiaryType[];
    loading: boolean;
    error: string | null;
}

const initialState: DiariesState = {
    diaries: [],
    loading: false,
    error: null,
};

const diariesSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    addDiary: (state, action: PayloadAction<{ diary: DiaryType }>) => {
      state.diaries = state.diaries.concat(action.payload.diary);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.diaries = action.payload;
      })
      .addCase(fetchDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(delDiary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delDiary.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        const newDiaries = state.diaries.filter(diary => diary.id !== action.payload.id)
        state.diaries = newDiaries;
      })
      .addCase(delDiary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addDiary } = diariesSlice.actions;

export default diariesSlice.reducer;