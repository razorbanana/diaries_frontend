import {createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInterface {
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
}

const initialState: UserState = {
    user: {
        id: '',
        email: '',
        name: 'string',
        visible: false,
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    token: '',
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
}});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
