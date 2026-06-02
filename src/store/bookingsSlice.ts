import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Booking } from '../model'

export interface BookingsState {
  bookings: Booking[]
}

const initialState: BookingsState = {
  bookings: [],
}

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = [
        ...state.bookings,
        ...action.payload
      ]
    },
    replaceBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload)
    }
  },
})

export const { addBookings, replaceBooking, deleteBooking } = bookingsSlice.actions

export default bookingsSlice.reducer