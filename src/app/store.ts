import { configureStore } from '@reduxjs/toolkit'
import diariesReducer from './diaries/diariesSlice'
import diaryEntriesReducer from './diaryEntries/diaryEntriesSlice'
import entryReducer from './entry/entrySlice'
import entryFormReducer from './forms/entryFormSlice'
import loginFormReducer from './forms/loginFormSlice'
import userReducer from './user/userSlice'
import registerReducer from './forms/registerFormSlice'
import diaryFormReducer from './forms/diaryFormSlice'
import editUserFormReducer from './forms/editUserFormSlice'
import editDiaryFormReducer from './forms/editDiaryFormSlice'
import editPasswordFormReducer from './forms/editPasswordFormSlice'
import editEntryFormReducer from './forms/editEntryFormSlice'

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
    editEntryForm: editEntryFormReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
