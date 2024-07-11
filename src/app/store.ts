import { configureStore } from '@reduxjs/toolkit'
import diariesReducer, { DiariesState } from './diaries/diariesSlice'
import diaryEntriesReducer, { DiaryEntriesState } from './diary/diaryEntriesSlice'

export const store = configureStore({
  reducer: {
    diaries: diariesReducer,
    diaryEntries: diaryEntriesReducer,
  },
  preloadedState: {
    diaries: {} as DiariesState,
    diaryEntries: {} as DiaryEntriesState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
