import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ConsoleLogger from '../../common/utils/logger';
import { updateUserPassword } from '../../services/users';

const log = new ConsoleLogger();

export const updatePassword: any = createAsyncThunk('user/updateMyUser', async (formData: EditPasswordFormInterface) => {
  const { oldPassword, newPassword, confirmPassword } = formData;
  console.log(formData)
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
  const response = await updateUserPassword(oldPassword, newPassword)
  log.info(`response in updatePassword`)
  log.info(response)
  return response;
});

export interface EditPasswordFormInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EditPasswordFormState {
  formData: EditPasswordFormInterface;
  isVisible: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: EditPasswordFormState = {
  formData: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  isVisible: false,
  loading: false,
  error: null
};

const editPasswordFormSlice = createSlice({
  name: 'editPasswordForm',
  initialState,
  reducers: {
    setEditPasswordFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.formData = { ...state.formData, [name]: value};
    },
    toggleEditPasswordFormVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    resetEditPasswordForm: (state) => {
      state.formData = { ...initialState.formData };
    },
    hideEditPasswordForm: (state) => {
      state.formData = { ...initialState.formData }
      state.isVisible = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.isVisible = false;
        state.formData = initialState.formData;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
}});

export const {resetEditPasswordForm, hideEditPasswordForm, toggleEditPasswordFormVisibility, setEditPasswordFormData } = editPasswordFormSlice.actions;

export default editPasswordFormSlice.reducer;