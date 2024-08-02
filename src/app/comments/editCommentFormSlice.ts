import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EditCommentFormInterface {
  id: string;
  content: string;
}

export interface EditCommentFormState {
  formData: EditCommentFormInterface;
  isVisible: boolean;
}

const initialState: EditCommentFormState = {
  formData: {
    id: '',
    content: ''
  },
  isVisible: false,
};

const editCommentFormSlice = createSlice({
  name: 'editCommentForm',
  initialState,
  reducers: {
    getEditCommentFormData: (state, action) => {
        const newFormData = {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content
        }
        state.formData = newFormData;
      },
    setEditCommentFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEditCommentFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetEditCommentForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEditCommentForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  }
});
export const { setEditCommentFormData, getEditCommentFormData, toggleEditCommentFormVisibility, resetEditCommentForm, hideEditCommentForm } = editCommentFormSlice.actions;

export default editCommentFormSlice.reducer;