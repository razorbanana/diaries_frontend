import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DiaryFormData {
  title: string;
  description: string;
}

export interface DiaryFormState {
  formData: DiaryFormData;
  isVisible: boolean;
}

const initialState: DiaryFormState = {
  formData: {
    title: '',
    description: '',
  },
  isVisible: false,
};

const diaryFormSlice = createSlice({
  name: 'diaryForm',
  initialState,
  reducers: {
    setDiaryFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleDiaryFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetDiaryForm: (state) => {
      state.formData = { ...initialState.formData };
    },
  },
});

export const { setDiaryFormData, toggleDiaryFormVisibility, resetDiaryForm } = diaryFormSlice.actions;

export default diaryFormSlice.reducer;