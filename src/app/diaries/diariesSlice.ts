import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DiaryType } from "../../types/diaryType";
import { getMyDiaries } from "../../services/diaries";

export const fetchDiaries: any = createAsyncThunk('diaries/fetchDiaries', async () => {
    const response = await getMyDiaries()
    console.log(`response in fetchDiaries`)
    console.log(response)
    return response;
  });

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaries.fulfilled, (state, action) => {
        state.loading = false;
        console.log(`action in diariesSlice`)
        console.log(action)
        state.diaries = action.payload;
      })
      .addCase(fetchDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default diariesSlice.reducer;