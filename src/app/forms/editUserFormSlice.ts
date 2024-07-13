import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyUser, UserInterface } from '../user/userSlice';


export interface EditUserFormState {
  formData: UserInterface;
  isVisible: boolean;
}

const initialState: EditUserFormState = {
  formData: {
    id: '',
    email: '',
    name: '',
    visible: false,
    createdAt : new Date(),
    updatedAt : new Date(),
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
    resetEditUserForm: (state) => {
      state.formData = { ...initialState.formData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyUser.fulfilled, (state, action) => {
        state.formData = action.payload;
      })
  }
});

export const { setEditUserFormData, toggleEditUserFormVisibility, resetEditUserForm } = editUserFormSlice.actions;

export default editUserFormSlice.reducer;