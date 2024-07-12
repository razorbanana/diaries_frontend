import { configureStore } from '@reduxjs/toolkit'
import diariesReducer, { DiariesState } from './diaries/diariesSlice'
import diaryEntriesReducer, { DiaryEntriesState } from './diaryEntries/diaryEntriesSlice'
import entryReducer, {EntryState} from './entry/entrySlice'
import entryFormReducer, {EntryFormState} from './forms/entryFormSlice'
import loginFormReducer, {LoginFormState} from './forms/loginFormSlice'
import userReducer, {UserState} from './user/userSlice'
import registerReducer, { RegisterFormState } from './forms/registerFormSlice'
import diaryFormReducer, {DiaryFormState} from './forms/diaryFormSlice'

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
  },
  preloadedState: {
    diaries: {} as DiariesState,
    diaryEntries: {} as DiaryEntriesState,
    entry: {} as EntryState,
    entryForm: {} as EntryFormState,
    diaryForm: {} as DiaryFormState,
    loginForm: {} as LoginFormState,
    registerForm: {} as RegisterFormState,
    user: {} as UserState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
