import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Event } from '../model'

export interface EventsState {
  events: Event[],
  favoriteEventsIds: string[],
}

const initialState: EventsState = {
  events: [],
  favoriteEventsIds: [],
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = [
        ...state.events,
        ...action.payload
      ]
    },
    replaceEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    toggleFavoriteEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload
      if (state.favoriteEventsIds.includes(eventId)) {
        state.favoriteEventsIds = state.favoriteEventsIds.filter(id => id !== eventId)
      } else {
        state.favoriteEventsIds.push(eventId)
      }
    }
  },
})

export const { addEvents, replaceEvent, deleteEvent, toggleFavoriteEvent } = eventsSlice.actions

export default eventsSlice.reducer