import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyUser } from '../user/userSlice';

export interface EditUserFormInterface {
  id: string;
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
    id: '',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyUser.fulfilled, (state, action) => {
        const newFormData = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          visible: action.payload.visible
        }
        state.formData = newFormData;
      })
  }
});

export const { setEditUserFormData, toggleEditUserFormVisibility, resetEditUserForm, toggleUserVisibility } = editUserFormSlice.actions;

export default editUserFormSlice.reducer;