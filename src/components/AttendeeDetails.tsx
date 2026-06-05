import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useBookingForm } from "../ctx/bookingForm.context";

function AttendeeDetails() {
    const { selectedTickets, updateAttendee, removeTicket } = useBookingForm();

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Attendee details</Typography>
            {selectedTickets.length === 0 && (
                <Typography color="text.secondary">No tickets selected yet. Go back to add tickets.</Typography>
            )}

            {selectedTickets.map((item) => (
            <Card key={item.ticketId} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.ticketName} x {item.quantity}
                        </Typography>
                        <Button color="error" onClick={() => removeTicket(item.ticketId)}>
                        Remove
                        </Button>
                    </Box>

                    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                        {item.attendees.map((attendee, index) => (
                        <Card key={`${item.ticketId}-${index}`} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                            Attendee {index + 1}
                            </Typography>
                            <Box sx={{ display: "grid", gap: 1.5 }}>
                            <TextField
                                label="Name"
                                value={attendee.name}
                                onChange={(e) => updateAttendee(item.ticketId, index, "name", e.target.value)}
                                size="small"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={attendee.email}
                                onChange={(e) => updateAttendee(item.ticketId, index, "email", e.target.value)}
                                size="small"
                            />
                            <TextField
                                label="Phone"
                                value={attendee.phone}
                                onChange={(e) => updateAttendee(item.ticketId, index, "phone", e.target.value)}
                                size="small"
                            />
                            </Box>
                        </Card>
                        ))}
                    </Box>
                </CardContent>
            </Card>
            ))}
        </Box>
    );
}

export default AttendeeDetails;