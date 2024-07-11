import { configureStore } from '@reduxjs/toolkit'
import diariesReducer, { DiariesState } from './diaries/diariesSlice'

export const store = configureStore({
  reducer: {
    diaries: diariesReducer,
  },
  preloadedState: {
    diaries: {} as DiariesState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
