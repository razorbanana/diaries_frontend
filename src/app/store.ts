import { configureStore } from '@reduxjs/toolkit'
import diariesReducer, { DiariesState } from './diaries/diariesSlice'
import diaryEntriesReducer, { DiaryEntriesState } from './diaryEntries/diaryEntriesSlice'
import entryReducer, {EntryState} from './entry/entrySlice'
import entryFormReducer, {EntryFormState} from './forms/entryFormSlice'

export const store = configureStore({
  reducer: {
    diaries: diariesReducer,
    diaryEntries: diaryEntriesReducer,
    entry: entryReducer,
    entryForm: entryFormReducer,
  },
  preloadedState: {
    diaries: {} as DiariesState,
    diaryEntries: {} as DiaryEntriesState,
    entry: {} as EntryState,
    entryForm: {} as EntryFormState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
