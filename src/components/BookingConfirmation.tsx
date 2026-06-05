import { Box, Divider, Paper, Typography } from "@mui/material";
import { useBookingForm } from "../context/bookingForm.context";
import { useMemo } from "react";

function BookingConfirmation() {
    const { selectedTickets } = useBookingForm();

    const subtotal = useMemo(
        () => selectedTickets.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [selectedTickets]
    );

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Confirmation</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                Review your ticket choices and attendee details before confirming the booking.
            </Typography>
            {selectedTickets.length === 0 ? (
                <Typography color="text.secondary">No booking details to confirm yet.</Typography>
            ) : (
                <Box sx={{ display: "grid", gap: 2 }}>
                    {selectedTickets.map((item) => (
                    <Paper key={item.ticketId} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.ticketName} x {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${item.price} each • {item.attendees.length} attendee(s)
                        </Typography>
                    </Paper>
                    ))}
                    <Divider />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Estimated total: ${subtotal.toFixed(2)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default BookingConfirmation;