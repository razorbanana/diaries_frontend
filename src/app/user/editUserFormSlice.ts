import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyUser } from './userSlice';

export interface EditUserFormInterface {
  email: string;
  name: string;
  visible: boolean;
}

export interface EditUserFormState {
  formData: EditUserFormInterface;
  isVisible: boolean;
}

const initialState: EditUserFormState = {
  formData: {
    email: '',
    name: '',
    visible: false
  },
  isVisible: false,
};

const editUserFormSlice = createSlice({
  name: 'editUserForm',
  initialState,
  reducers: {
    setEditUserFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEditUserFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleUserVisibility: (state) => {
      state.formData.visible = !state.formData.visible;
    },
    resetEditUserForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEditUserForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyUser.fulfilled, (state, action) => {
        const newFormData = {
          email: action.payload.email,
          name: action.payload.name,
          visible: action.payload.visible
        }
        state.formData = newFormData;
      })
  }
});

export const { setEditUserFormData, toggleEditUserFormVisibility, resetEditUserForm, toggleUserVisibility, hideEditUserForm } = editUserFormSlice.actions;

export default editUserFormSlice.reducer;