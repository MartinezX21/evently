import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import type { Booking } from '../model';

interface BookingsState {
  filterBy: "upcoming" | "past" | "all"
}

const bookingAdapter = createEntityAdapter<Booking, string>({
  selectId: (booking: Booking) => booking.id
});

const initialState = bookingAdapter.getInitialState<BookingsState>({
  filterBy: "all"
})

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    saveBooking: bookingAdapter.upsertOne,
    bookingsReceived: (state, action: PayloadAction<Booking[]>) => {
      bookingAdapter.setAll(state, action.payload)
    },
    deleteBooking: bookingAdapter.removeOne,
    updateFilterBy: (state, action: PayloadAction<"upcoming" | "past" | "all">) => {
      state.filterBy = action.payload
    }
  },
})

export const { saveBooking, bookingsReceived, deleteBooking, updateFilterBy } = bookingsSlice.actions;

export default bookingsSlice.reducer;

export const {
  selectAll: selectAllBookings,
  selectById: selectBookingById,
} = bookingAdapter.getSelectors((state: RootState) => state.bookings);