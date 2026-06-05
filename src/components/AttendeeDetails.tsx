import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useBookingForm } from "../context/bookingForm.context";
import { useCallback } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{3}\-\d{3}\-\d{4}$/;

function AttendeeDetails({ onErrorStateChange }: { onErrorStateChange: (hasError: boolean) => void }) {
    const { selectedTickets, updateAttendee, removeTicket } = useBookingForm();

    function handleUpdateAttendee(ticketId: string, attendeeIndex: number, field: "name" | "email" | "phone", value: string) {
        updateAttendee(ticketId, attendeeIndex, field, value);
    }

    const getFieldError = useCallback((field: "name" | "email" | "phone", value: string) => {
        if (!value.trim()) {
            onErrorStateChange(true);
            return "This field is required.";
        }

        if (field === "email" && !emailPattern.test(value)) {
            onErrorStateChange(true);
            return "Please enter a valid email address.";
        }

        if(field === "phone" && !phonePattern.test(value)) {
            onErrorStateChange(true);
            return "Please enter a valid phone number."
        }

        onErrorStateChange(false);
        return "";
    }, []);

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
                                onChange={(e) => handleUpdateAttendee(item.ticketId, index, "name", e.target.value)}
                                size="small"
                                required
                                error={Boolean(getFieldError("name", attendee.name))}
                                helperText={getFieldError("name", attendee.name)}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={attendee.email}
                                onChange={(e) => handleUpdateAttendee(item.ticketId, index, "email", e.target.value)}
                                size="small"
                                placeholder="mail@domain.com"
                                required
                                error={Boolean(getFieldError("email", attendee.email))}
                                helperText={getFieldError("email", attendee.email)}
                            />
                            <TextField
                                label="Phone"
                                value={attendee.phone}
                                onChange={(e) => handleUpdateAttendee(item.ticketId, index, "phone", e.target.value)}
                                size="small"
                                placeholder="XXX-XXX-XXXX"
                                required
                                error={Boolean(getFieldError("phone", attendee.phone))}
                                helperText={getFieldError("phone", attendee.phone)}
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