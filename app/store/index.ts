import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as Dispatch, useSelector as Selector } from 'react-redux'
import { chromeReducer } from '../features/chrome'
import { notesReducer } from '../features/notes'
import { settingsReducer } from '../features/settings'
import { terminalReducer } from '../features/terminal'
import { trashReducer } from '../features/trash'
import { frameReducer } from '../features/window-slice'

export const store = configureStore({
  reducer: {
    windowFrame: frameReducer,
    terminal: terminalReducer,
    chrome: chromeReducer,
    settings: settingsReducer,
    iNotes: notesReducer,
    trash: trashReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = Dispatch.withTypes<AppDispatch>()
export const useSelector = Selector.withTypes<RootState>()
