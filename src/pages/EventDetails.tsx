import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { selectEventById, toggleFavoriteEvent } from "../store/eventsSlice";

function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const event = useSelector((state: RootState) =>
        eventId ? selectEventById(state, eventId) : undefined
    );
    const isFavorite = useSelector((state: RootState) =>
        eventId ? state.events.favoriteEventsIds.includes(eventId) : false
    );

    const handleToggleFavorite = () => {
        if (eventId) {
            dispatch(toggleFavoriteEvent(eventId));
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <EventDetailsBreadcrumbs eventTitle={event.title} />

            <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 3, bgcolor: 'background.paper' }}>
                <Box
                component="img"
                src={event.image}
                alt={event.title}
                sx={{ width: '100%', maxHeight: 360, objectFit: 'cover' }}
                />

                <Card sx={{ borderRadius: 0, boxShadow: 'none' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        gap: 2,
                    }}
                    >
                    <Box>
                        <Chip label={event.category} color="primary" />
                        <Typography variant="h3" component="h1" sx={{ mt: 2, fontWeight: 700 }}>
                        {event.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                        Organized by {event.organizerName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <IconButton
                        color="error"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        onClick={() => handleToggleFavorite()}
                        >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Button component={Link} to={`/events/${event.id}/booking`} variant="outlined">
                        Book Tickets
                        </Button>
                    </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {event.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Event details</Typography>
                        <Typography variant="body1"><strong>Date:</strong> {event.date}</Typography>
                        <Typography variant="body1"><strong>Time:</strong> {event.time}</Typography>
                        <Typography variant="body1"><strong>Location:</strong> {event.location}</Typography>
                        <Typography variant="body1"><strong>Venue:</strong> {event.venue}</Typography>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Ticket options</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {event.ticketTypes.map((ticket) => (
                            <Paper key={ticket.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{ticket.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {ticket.available} tickets available
                                </Typography>
                                </Box>
                                <Typography variant="h6">${ticket.price}</Typography>
                            </Box>
                            </Paper>
                        ))}
                        </Box>
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            </Paper>
        </Container>
    );
}

function EventDetailsBreadcrumbs({ eventTitle }: { eventTitle: string }) {
    return (
        <div role="presentation" style={{ marginBottom: 16 }}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Events
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{eventTitle}</Typography>
        </Breadcrumbs>
        </div>
    );
}

export default EventDetails;
