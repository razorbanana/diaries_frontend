import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMyUser, patchMyUser } from '../../services/users';

export const fetchMyUser: any = createAsyncThunk('user/fetchMyUser', async () => {
    const response = await getMyUser()
    console.log(`response in fetchMyUser`)
    console.log(response)
    return response;
});

export const updateMyUser: any = createAsyncThunk('user/updateMyUser', async (formData: UserInterface) => {
  const response = await patchMyUser(formData.name, formData.email, formData.visible)
  console.log(`response in fetchMyUser`)
  console.log(response)
  return response;
});

export interface UserInterface {
    id: string;
    email: string;
    name: string;
    visible: boolean;
    createdAt : Date;
    updatedAt : Date;
}

export interface UserState {
    user: UserInterface;
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
        createdAt : new Date(),
        updatedAt : new Date(),
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
        console.log(state)
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
        state.user = action.payload;
        console.log(state)
    },
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
        state.user = action.payload;
      })
      .addCase(updateMyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //   .addCase(delEntry.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(delEntry.fulfilled, (state) => {
    //     state.loading = false;
    //     state.entry = { id: '', title: '', content: '' };
    //   })
    //   .addCase(delEntry.rejected, (state, action) => {
    //     state.loading = true;
    //     state.error = action.error.message;
    //   })
  },});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
