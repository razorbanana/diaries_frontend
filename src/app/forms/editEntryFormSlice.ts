import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EditEntryFormInterface {
  id: string;
  title: string;
  content: string;
}

export interface EditEntryFormState {
  formData: EditEntryFormInterface;
  isVisible: boolean;
}

const initialState: EditEntryFormState = {
  formData: {
    id: '',
    title: '',
    content: ''
  },
  isVisible: false,
};

const editEntryFormSlice = createSlice({
  name: 'editEntryForm',
  initialState,
  reducers: {
    getEditEntryFormData: (state, action) => {
        const newFormData = {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content
        }
        state.formData = newFormData;
      },
    setEditEntryFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEditEntryFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetEditEntryForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEditEntryForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  }
});

export const { setEditEntryFormData, getEditEntryFormData, toggleEditEntryFormVisibility, resetEditEntryForm, hideEditEntryForm } = editEntryFormSlice.actions;

export default editEntryFormSlice.reducer;