import { configureStore } from '@reduxjs/toolkit'
import { eventsSlice } from './eventsSlice'
import { bookingsSlice } from './bookingsSlice'

export const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
    bookings: bookingsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch