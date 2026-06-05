import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { Event } from "../model";
import type { RootState } from "../store";
import { toggleFavoriteEvent } from "../store/eventsSlice";

function EventCard({ event }: { event: Event }) {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: RootState) =>
        state.events.favoriteEventsIds.includes(event.id)
    );

    const handleToggleFavorite = () => {
        dispatch(toggleFavoriteEvent(event.id));
    }

    return (
        <Card key={event.id} className="event-card">
            <CardMedia component="img" height="140" image={event.image} alt={event.title} />
            <CardContent>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.category} — {event.date} {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.location} — {event.venue}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button component={Link} to={`/events/${event.id}`} size="small">
                        View
                    </Button>
                    <Button component={Link} to={`/events/${event.id}/booking`} size="small">
                        Book
                    </Button>
                </Box>
                <IconButton
                    color="error"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    onClick={handleToggleFavorite}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default EventCard;