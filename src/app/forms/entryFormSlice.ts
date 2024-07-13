import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EntryFormData {
  title: string;
  content: string;
}

export interface EntryFormState {
  formData: EntryFormData;
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
    setEntryFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEntryFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetEntryForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEntryForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  },
});

export const { setEntryFormData, toggleEntryFormVisibility, resetEntryForm, hideEntryForm } = entryFormSlice.actions;

export default entryFormSlice.reducer;

