import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DiaryFormData {
  title: string;
  description: string;
  category: string;
  isPrivate: boolean;
}

export interface DiaryFormState {
  formData: DiaryFormData;
  isVisible: boolean;
}

const initialState: DiaryFormState = {
  formData: {
    title: '',
    description: '',
    category: 'general',
    isPrivate: true,
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
    setDiaryFormPrivacy: (state, action: PayloadAction<boolean>) => {
      state.formData.isPrivate = action.payload;
    },
    toggleDiaryFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetDiaryForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideDiaryForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  },
});

export const { setDiaryFormData, toggleDiaryFormVisibility, resetDiaryForm, hideDiaryForm, setDiaryFormPrivacy } = diaryFormSlice.actions;

export default diaryFormSlice.reducer;