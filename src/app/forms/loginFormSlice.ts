import {createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginFormEntries {
    username: string;
    password: string;
}

export interface LoginFormState {
    entries: LoginFormEntries;
    isVisible: boolean;
}

const initialState: LoginFormState = {
    entries: {
        username: '',
        password: '',
    },
    isVisible: true,
};

const loginFormSlice = createSlice({
name: 'loginForm',
initialState,
reducers: {
    setLoginFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
        const { name, value } = action.payload;
        console.log("Setting login form data"+name+" "+value)
        state.entries = { ...state.entries, [name]: value};
        console.log(state)
    },
    resetLoginForm: (state) => {
        state.entries = { ...initialState.entries };
    },
    toggleLoginForm: (state) => {
        state.isVisible = !state.isVisible;
    }
},
});

export const { setLoginFormData, resetLoginForm, toggleLoginForm } = loginFormSlice.actions;

export default loginFormSlice.reducer;
