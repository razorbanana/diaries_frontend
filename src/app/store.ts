import { configureStore } from '@reduxjs/toolkit'
import diariesReducer, { DiariesState } from './diaries/diariesSlice'
import diaryEntriesReducer, { DiaryEntriesState } from './diaryEntries/diaryEntriesSlice'
import entryReducer, {EntryState} from './entry/entrySlice'
import entryFormReducer, {EntryFormState} from './forms/entryFormSlice'
import loginFormReducer, {LoginFormState} from './forms/loginFormSlice'
import userReducer, {UserState} from './user/userSlice'

export const store = configureStore({
  reducer: {
    diaries: diariesReducer,
    diaryEntries: diaryEntriesReducer,
    entry: entryReducer,
    entryForm: entryFormReducer,
    loginForm: loginFormReducer,
    user: userReducer,
  },
  preloadedState: {
    diaries: {} as DiariesState,
    diaryEntries: {} as DiaryEntriesState,
    entry: {} as EntryState,
    entryForm: {} as EntryFormState,
    loginForm: {} as LoginFormState,
    user: {} as UserState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
