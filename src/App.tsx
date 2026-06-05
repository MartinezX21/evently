import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import AppHeader from "./components/AppHeader"
import Bookings from "./pages/Bookings"
import EventDetails from "./pages/EventDetails"
import { BookingFormProvider } from "./ctx/bookingForm.context"
import BookingForm from "./pages/BookingForm"

function App() {

  return (
    <BookingFormProvider>
      <CssBaseline />
      <AppHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/events/:eventId/booking" element={<BookingForm />} />
      </Routes>
    </BookingFormProvider>
  )
}

export default App
