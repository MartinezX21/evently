import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import AppHeader from "./components/AppHeader"
import Bookings from "./pages/Bookings"

function App() {

  return (
    <>
      <CssBaseline />
      <AppHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </>
  )
}

export default App
