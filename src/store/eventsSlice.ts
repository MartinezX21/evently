import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Event } from '../model'
import type { RootState } from '.'

interface EventsState {
  favoriteEventsIds: string[]
  searchTerm: string
}

const eventAdapter = createEntityAdapter<Event, string>({
  selectId: (event: Event) => event.id
});

const initialState = eventAdapter.getInitialState<EventsState>({
  favoriteEventsIds: [],
  searchTerm: '',
})

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    saveEvent: eventAdapter.upsertOne,
    eventsReceived: (state, action: PayloadAction<Event[]>) => {
      eventAdapter.setAll(state, action.payload)
    },
    deleteEvent: eventAdapter.removeOne,
    toggleFavoriteEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload
      if (state.favoriteEventsIds.includes(eventId)) {
        state.favoriteEventsIds = state.favoriteEventsIds.filter(id => id !== eventId)
      } else {
        state.favoriteEventsIds.push(eventId)
      }
    },
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    }
  },
})

export const { saveEvent, eventsReceived, deleteEvent, toggleFavoriteEvent, updateSearchTerm } = eventsSlice.actions;

export default eventsSlice.reducer;

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
} = eventAdapter.getSelectors((state: RootState) => state.events);