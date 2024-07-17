import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EditDiaryFormInterface {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
}

export interface EditDiaryFormState {
  formData: EditDiaryFormInterface;
  isVisible: boolean;
}

const initialState: EditDiaryFormState = {
  formData: {
    id: '',
    title: '',
    description: '',
    isPrivate: false
  },
  isVisible: false,
};

const editDiaryFormSlice = createSlice({
  name: 'editDiaryForm',
  initialState,
  reducers: {
    getEditDiaryFormData: (state, action) => {
        const newFormData = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            isPrivate: action.payload.isPrivate
        }
        state.formData = newFormData;
      },
    setEditDiaryFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEditDiaryFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleDiaryPrivacy: (state) => {
      state.formData.isPrivate = !state.formData.isPrivate;
    },
    resetEditDiaryForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEditDiaryForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  }
});

export const { setEditDiaryFormData, getEditDiaryFormData, toggleEditDiaryFormVisibility, resetEditDiaryForm, toggleDiaryPrivacy, hideEditDiaryForm } = editDiaryFormSlice.actions;

export default editDiaryFormSlice.reducer;