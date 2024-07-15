import {createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterFormEntries {
    username: string;
    email: string;
    password: string;
}

export interface RegisterFormState {
    entries: RegisterFormEntries;
    isVisible: boolean;
}

const initialState: RegisterFormState = {
    entries: {
        username: '',
        email: '',
        password: '',
    },
    isVisible: true,
};

const registerFormSlice = createSlice({
name: 'registerForm',
initialState,
reducers: {
    setRegisterFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
        const { name, value } = action.payload;
        console.log("Setting register form data"+name+" "+value)
        state.entries = { ...state.entries, [name]: value};
    },
    resetRegisterForm: (state) => {
        state.entries = { ...initialState.entries };
    },
    toggleRegisterForm: (state) => {
        state.isVisible = !state.isVisible;
    }
},
});

export const { setRegisterFormData, resetRegisterForm, toggleRegisterForm } = registerFormSlice.actions;

export default registerFormSlice.reducer;