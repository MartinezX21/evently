import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import AppHeader from "./components/AppHeader"
import Bookings from "./pages/Bookings"
import EventDetails from "./pages/EventDetails"
import { BookingFormProvider } from "./context/bookingForm.context"
import BookingForm from "./pages/BookingForm"
import { ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import { darkTheme, lightTheme } from "./utilis"

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <BookingFormProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme} >
        <CssBaseline />
        <AppHeader onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/events/:eventId/booking" element={<BookingForm />} />
        </Routes>  
      </ThemeProvider>
    </BookingFormProvider>
  )
}

export default App
