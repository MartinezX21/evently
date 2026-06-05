import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Booking } from "../model";
import { cancelBooking, getBookings } from "../services";
import type { RootState } from "../store";
import { bookingsReceived, saveBooking, selectAllBookings, updateFilterBy } from "../store/bookingsSlice";

function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookings) || [];
  const filterBy = useSelector((state: RootState) => state.bookings.filterBy);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" as "success" | "error" });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getBookings("1");
        dispatch(bookingsReceived(response));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [dispatch]);

  const filteredBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking: Booking) => {
      const eventDate = new Date(booking.eventDate);
      const isUpcoming = eventDate >= today;

      if (filterBy === "upcoming") return isUpcoming;
      if (filterBy === "past") return !isUpcoming;
      return true;
    });
  }, [bookings, filterBy]);

  const handleCancel = async (bookingId: string) => {
    try {
      const updated = await cancelBooking(bookingId);
      dispatch(saveBooking(updated));
      setSnackbar({ open: true, message: "Booking cancelled successfully.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to cancel booking. Please try again.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BookingsBreadcrumbs />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>My bookings</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {(["all", "upcoming", "past"] as const).map((option) => (
            <Chip
              key={option}
              label={option.charAt(0).toUpperCase() + option.slice(1)}
              color={filterBy === option ? "primary" : "default"}
              onClick={() => dispatch(updateFilterBy(option))}
              variant={filterBy === option ? "filled" : "outlined"}
            />
          ))}
        </Box>
      </Box>

      {loading && <Typography color="text.secondary">Loading your bookings…</Typography>}

      {!loading && filteredBookings.length === 0 && (
        <Typography color="text.secondary">No bookings match this filter.</Typography>
      )}

      <Stack spacing={2}>
        {filteredBookings.map((booking: Booking) => {
          const eventDate = new Date(booking.eventDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isUpcoming = eventDate >= today;
          const canCancel = booking.status !== "cancelled" && isUpcoming;

          return (
            <Paper key={booking.id} sx={{ p: 3, borderRadius: 3 }} elevation={0} variant="outlined">
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{booking.eventTitle}</Typography>
                  <Typography variant="body2" color="text.secondary">Date: {booking.eventDate}</Typography>
                  <Typography variant="body2" color="text.secondary">Tickets: {booking.tickets.reduce((sum, item) => sum + item.quantity, 0)}</Typography>
                  <Typography variant="body2" color="text.secondary">Total: ${booking.totalAmount}</Typography>
                  <Typography variant="body2" color="text.secondary">Status: {booking.status}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: { xs: "flex-start", md: "flex-end" } }}>
                  <Chip label={isUpcoming ? "Upcoming" : "Past"} color={isUpcoming ? "success" : "default"} />
                  {canCancel && (
                    <Button variant="outlined" color="error" onClick={() => handleCancel(booking.id)}>
                      Cancel booking
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

function BookingsBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ color: 'text.primary' }}>My Bookings</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Bookings;