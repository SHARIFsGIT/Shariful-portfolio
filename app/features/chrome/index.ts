import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BrowserTab {
  id: string
  url: string
  title: string
  iframe_url: string
  favicon?: string
  isLoading: boolean
  isPinned: boolean
  isAudible: boolean
  isMuted: boolean
  lastAccessed: number
  index: number
}

const uuid = crypto.randomUUID()

const initialState: {
  tabs: BrowserTab[]
  focusedTab: string
  lastClosedTabs: BrowserTab[]
} = {
  tabs: [
    {
      id: uuid,
      title: 'New Tab',
      url: '',
      iframe_url: '',
      isLoading: false,
      isPinned: false,
      isAudible: false,
      isMuted: false,
      lastAccessed: Date.now(),
      index: 0,
    },
  ],
  focusedTab: uuid,
  lastClosedTabs: [], // For restoring recently closed tabs
}

const MAX_TABS = 50 // Chrome's default tab limit
const MAX_CLOSED_TABS = 25

const chromeSlice = createSlice({
  name: 'chrome',
  initialState,
  reducers: {
    addNewtab: (state, action: PayloadAction<{ index?: number }>) => {
      if (state.tabs.length < MAX_TABS) {
        const newid = crypto.randomUUID()
        const newTab: BrowserTab = {
          id: newid,
          title: 'New Tab',
          url: '',
          iframe_url: '',
          isLoading: false,
          isPinned: false,
          isAudible: false,
          isMuted: false,
          lastAccessed: Date.now(),
          index: action.payload.index ?? state.tabs.length,
        }

        // Insert at specified index or end
        if (action.payload.index !== undefined) {
          state.tabs.splice(action.payload.index, 0, newTab)
          // Update indices for tabs after insertion
          state.tabs.forEach((tab, idx) => {
            tab.index = idx
          })
        } else {
          state.tabs.push(newTab)
        }

        state.focusedTab = newid
      }
    },

    openUrlTab: (
      state,
      action: PayloadAction<{
        title: string
        live_url: string
        favicon?: string
        index?: number
      }>
    ) => {
      if (state.tabs.length < MAX_TABS) {
        const newid = crypto.randomUUID()
        const newTab: BrowserTab = {
          id: newid,
          title: action.payload.title,
          url: action.payload.live_url,
          iframe_url: action.payload.live_url,
          favicon: action.payload.favicon,
          isLoading: true,
          isPinned: false,
          isAudible: false,
          isMuted: false,
          lastAccessed: Date.now(),
          index: action.payload.index ?? state.tabs.length,
        }

        if (action.payload.index !== undefined) {
          state.tabs.splice(action.payload.index, 0, newTab)
          state.tabs.forEach((tab, idx) => {
            tab.index = idx
          })
        } else {
          state.tabs.push(newTab)
        }

        state.focusedTab = newid
      }
    },

    removeTab: (state, action: PayloadAction<string>) => {
      if (state.tabs.length >= 2) {
        const tabToRemove = state.tabs.find((tab) => tab.id === action.payload)
        if (tabToRemove) {
          // Add to recently closed tabs
          state.lastClosedTabs.unshift(tabToRemove)
          if (state.lastClosedTabs.length > MAX_CLOSED_TABS) {
            state.lastClosedTabs.pop()
          }
        }

        state.tabs = state.tabs.filter((tab) => tab.id !== action.payload)
        // Update indices after removal
        state.tabs.forEach((tab, idx) => {
          tab.index = idx
        })

        if (state.focusedTab === action.payload) {
          // Focus the tab to the left when closing, unless it's pinned
          const removedIndex = tabToRemove?.index ?? 0
          const nextTab = state.tabs
            .filter((tab) => !tab.isPinned)
            .find((tab) => tab.index === removedIndex - 1)
          state.focusedTab = nextTab?.id ?? state.tabs[state.tabs.length - 1].id
        }
      }
    },

    focusTab: (state, action: PayloadAction<string>) => {
      const tab = state.tabs.find((tab) => tab.id === action.payload)
      if (tab) {
        state.focusedTab = action.payload
        tab.lastAccessed = Date.now()
      }
    },

    updateTab: (
      state,
      action: PayloadAction<{
        id: string
        url?: string
        iframe_url?: string
        title?: string
        favicon?: string
        isLoading?: boolean
      }>
    ) => {
      const tab = state.tabs.find((tab) => tab.id === action.payload.id)
      if (tab) {
        Object.assign(tab, {
          ...action.payload,
          lastAccessed: Date.now(),
        })
      }
    },

    togglePinTab: (state, action: PayloadAction<string>) => {
      const tab = state.tabs.find((tab) => tab.id === action.payload)
      if (tab) {
        tab.isPinned = !tab.isPinned

        // Move pinned tabs to the start, unpinned tabs to after pinned tabs
        const pinnedTabs = state.tabs.filter((t) => t.isPinned)
        const unpinnedTabs = state.tabs.filter((t) => !t.isPinned)
        state.tabs = [...pinnedTabs, ...unpinnedTabs]

        // Update indices
        state.tabs.forEach((tab, idx) => {
          tab.index = idx
        })
      }
    },

    toggleMuteTab: (state, action: PayloadAction<string>) => {
      const tab = state.tabs.find((tab) => tab.id === action.payload)
      if (tab) {
        tab.isMuted = !tab.isMuted
      }
    },

    updateAudibleState: (
      state,
      action: PayloadAction<{ id: string; isAudible: boolean }>
    ) => {
      const tab = state.tabs.find((tab) => tab.id === action.payload.id)
      if (tab) {
        tab.isAudible = action.payload.isAudible
      }
    },

    moveTab: (
      state,
      action: PayloadAction<{ id: string; newIndex: number }>
    ) => {
      const { id, newIndex } = action.payload
      const oldIndex = state.tabs.findIndex((tab) => tab.id === id)

      if (oldIndex !== -1 && newIndex >= 0 && newIndex < state.tabs.length) {
        // Remove tab from old position and insert at new position
        const [tab] = state.tabs.splice(oldIndex, 1)
        state.tabs.splice(newIndex, 0, tab)

        // Update indices
        state.tabs.forEach((tab, idx) => {
          tab.index = idx
        })
      }
    },

    restoreLastClosedTab: (state) => {
      if (state.lastClosedTabs.length > 0 && state.tabs.length < MAX_TABS) {
        const [tabToRestore, ...remainingClosedTabs] = state.lastClosedTabs
        state.lastClosedTabs = remainingClosedTabs

        const restoredTab = {
          ...tabToRestore,
          id: crypto.randomUUID(), // Generate new ID for restored tab
          lastAccessed: Date.now(),
          index: state.tabs.length,
        }

        state.tabs.push(restoredTab)
        state.focusedTab = restoredTab.id
      }
    },

    resetChrome: (state) => {
      const id = crypto.randomUUID()
      state.focusedTab = id
      state.tabs = [
        {
          id: id,
          title: 'New Tab',
          url: '',
          iframe_url: '',
          isLoading: false,
          isPinned: false,
          isAudible: false,
          isMuted: false,
          lastAccessed: Date.now(),
          index: 0,
        },
      ]
      state.lastClosedTabs = []
    },
  },
})

export const {
  addNewtab,
  removeTab,
  focusTab,
  resetChrome,
  updateTab,
  openUrlTab,
  togglePinTab,
  toggleMuteTab,
  updateAudibleState,
  moveTab,
  restoreLastClosedTab,
} = chromeSlice.actions

export const chromeReducer = chromeSlice.reducer
