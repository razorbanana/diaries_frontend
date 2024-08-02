import { configureStore } from '@reduxjs/toolkit'
import diariesReducer from './diaries/diariesSlice'
import diaryEntriesReducer from './diaryEntries/diaryEntriesSlice'
import entryReducer from './entry/entrySlice'
import entryFormReducer from './diaryEntries/entryFormSlice'
import loginFormReducer from './forms/loginFormSlice'
import userReducer from './user/userSlice'
import registerReducer from './forms/registerFormSlice'
import diaryFormReducer from './diaries/diaryFormSlice'
import editUserFormReducer from './user/editUserFormSlice'
import editDiaryFormReducer from './diaries/editDiaryFormSlice'
import editPasswordFormReducer from './user/editPasswordFormSlice'
import editEntryFormReducer from './diaryEntries/editEntryFormSlice'
import filterReducer from './filter/filterSlice'
import postCommentFormReducer from './comments/postCommentFormSlice'
import commentsReducer from './comments/commentsSlice'
import editCommentFormReducer from './comments/editCommentFormSlice'

export const store = configureStore({
  reducer: {
    diaries: diariesReducer,
    diaryEntries: diaryEntriesReducer,
    entry: entryReducer,
    entryForm: entryFormReducer,
    diaryForm: diaryFormReducer,
    loginForm: loginFormReducer,
    registerForm: registerReducer,
    user: userReducer,
    editUserForm: editUserFormReducer,
    editDiaryForm: editDiaryFormReducer,
    editPasswordForm: editPasswordFormReducer,
    editEntryForm: editEntryFormReducer,
    filter: filterReducer,
    postCommentForm: postCommentFormReducer,
    comments: commentsReducer,
    editCommentForm: editCommentFormReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
