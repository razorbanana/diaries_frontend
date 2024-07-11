import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  title: string;
  content: string;
}

export interface EntryFormState {
  formData: FormData;
  isVisible: boolean;
}

const initialState: EntryFormState = {
  formData: {
    title: '',
    content: '',
  },
  isVisible: false,
};

const entryFormSlice = createSlice({
  name: 'entryForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetForm: (state) => {
      state.formData = { ...initialState.formData };
    },
  },
});

export const { setFormData, toggleFormVisibility, resetForm } = entryFormSlice.actions;

export default entryFormSlice.reducer;

