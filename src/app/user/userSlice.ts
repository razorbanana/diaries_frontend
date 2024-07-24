import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMyUser, getMyUser, patchMyUser } from '../../services/users';
import  ConsoleLogger from '../../common/utils/logger';
import { UserType } from '../../common/types/userType';

const log = new ConsoleLogger();

export const fetchMyUser: any = createAsyncThunk('user/fetchMyUser', async () => {
    const response = await getMyUser()
    log.info(`response in fetchMyUser`)
    log.info(response)
    return response;
});

export const updateMyUser: any = createAsyncThunk('user/updateMyUser', async (formData: UserType) => {
  const response = await patchMyUser(formData.name, formData.email, formData.visible)
  log.info(`response in patchMyUser`)
  log.info(response)
  return response;
});

export const delMyUser: any = createAsyncThunk('user/delMyUser', async () => {
  const response = await deleteMyUser()
  log.info(`response in delMyUser`)
  log.info(response)
  return response;
});

export interface UserState {
    user: UserType;
    token: string;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: {
        id: '',
        email: '',
        name: '',
        visible: false,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString(),
    },
    token: '',
    loading: false,
    error: null,
};

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
    }
},
extraReducers: (builder) => {
    builder
      .addCase(fetchMyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(updateMyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(delMyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delMyUser.fulfilled, (state) => {
        state.loading = false;
        state.user = initialState.user;
      })
      .addCase(delMyUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
  },});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
