import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Booking, Event } from "../model";
import { useBookingForm } from "../context/bookingForm.context";
import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectEventById } from "../store/eventsSlice";
import type { RootState } from "../store";
import TicketSelection from "../components/TicketSelection";
import AttendeeDetails from "../components/AttendeeDetails";
import BookingConfirmation from "../components/BookingConfirmation";
import { addNewBooking } from "../services";

const steps = ["Select tickets", "Attendee details", "Confirmation"];

function BookingForm() {
    const { eventId } = useParams();
    const event: Event | undefined = useSelector((state: RootState) =>
        eventId ? selectEventById(state, eventId) : undefined
    );
    const [activeStep, setActiveStep] = useState(0);
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });
    const [attendeeHasError, setAttendeeHasError] = useState(false);

    const { selectedTickets, resetForm } = useBookingForm();

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            switch (activeStep) {
                case 0:
                    if (selectedTickets.length === 0) {
                        showSnackbar("Please select at least one ticket to proceed.", "error");
                        return;
                    }
                    break;
                case 1:
                    const hasInvalidAttendee = selectedTickets.some((item) =>
                        item.attendees.some((attendee) => !attendee.name.trim() || !attendee.email.trim() || !attendee.phone.trim())
                    );
                    if (hasInvalidAttendee) {
                        showSnackbar("Please provide complete details for all attendees.", "error");
                        return;
                    }
                    if (attendeeHasError) {
                        showSnackbar("There are issues with one or more attendees, please fix them to proceed", "error");
                        return;
                    }
                    break;
                default:
                    break;
            }
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!event || saving) return;

        setSaving(true);
        const bookingData: Booking = {
            eventId: event.id,
            userId: "1",
            referenceNumber: `BK${Date.now()}`,
            eventTitle: event.title,
            status: "pending",
            totalAmount: selectedTickets.reduce((sum, item) => sum + item.price * item.quantity, 0),
            bookingDate: new Date().toISOString(),
            eventDate: event.date,
            tickets: selectedTickets.map((item) => ({
                type: item.ticketName,
                quantity: item.quantity,
                price: item.price,
            })),
            attendees: selectedTickets.flatMap((item) =>
                item.attendees.map((attendee) => ({
                    name: attendee.name,
                    email: attendee.email,
                    phone: attendee.phone,
                }))
            ),
            id: "", // This will be set by the backend
        };
        try {
            await addNewBooking(bookingData);
            resetForm();
            setActiveStep(0);
            showSnackbar("Booking successful! Your reference number is " + bookingData.referenceNumber, "success");
        } catch (error) {
            showSnackbar("Failed to submit booking. Please try again.", "error");
        } finally {
            setSaving(false);
        }
    }

    if (!event) {
        return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5">Event not found.</Typography>
            <Button component={Link} to="/" sx={{ mt: 2 }}>
                Back to events
            </Button>
        </Container>
        );
    }
    
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <BookingFormBreadcrumbs eventId={event.id} eventTitle={event.title} />

            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                    Book tickets for {event.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Complete the booking in three simple steps.
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && <TicketSelection event={event} />}

                {activeStep === 1 && <AttendeeDetails onErrorStateChange={(hasError: boolean) => setAttendeeHasError(hasError)} />}

                {activeStep === 2 && <BookingConfirmation />}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button onClick={resetForm} color="warning">
                        Reset
                        </Button>
                        {activeStep < steps.length - 1 ? (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                        ) : (
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            {saving ? <> <CircularProgress size={20} sx={{ mr: 1, color: "white" }} /> Confirming... </> : "Confirm booking"}
                        </Button>
                        )}
                    </Box>
                </Box>
            </Paper>

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

function BookingFormBreadcrumbs({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
    return (
        <div role="presentation" style={{ marginBottom: 16 }}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Events
            </Link>
            <Link to={`/events/${eventId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {eventTitle}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Book tickets</Typography>
        </Breadcrumbs>
        </div>
    );
}

export default BookingForm;
