import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostCommentFormData {
    content: string;
}

export interface PostCommentFormState {
    formData: PostCommentFormData;
    isVisible: boolean;
}

const initialState: PostCommentFormState = {
    formData: {
        content: '',
    },
    isVisible: false,
};

const postCommentFormSlice = createSlice({
    initialState,
    name: 'postCommentForm',
    reducers: {
        setPostCommentFormData: (state, action: PayloadAction<{name: string, value: string}>) => {
            const {name, value} = action.payload;
            state.formData = {...state.formData, [name]: value};
        },
        togglePostCommentFormVisibility: (state) => {
            state.isVisible = !state.isVisible;
        },
        resetPostCommentForm: (state) => {
            state.formData = {...initialState.formData};
        },
        hidePostCommentForm: (state) => {
            state.formData = {...initialState.formData};
            state.isVisible = false;
        }
    }
})

export const { setPostCommentFormData, togglePostCommentFormVisibility, resetPostCommentForm, hidePostCommentForm } = postCommentFormSlice.actions;

export default postCommentFormSlice.reducer;