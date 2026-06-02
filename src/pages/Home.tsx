import { Breadcrumbs, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { useEffect } from "react";
import { getEvents } from "../services";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addEvents } from "../store/eventsSlice";
import type { Event } from "../model";

function Home() {
  const events = useSelector((state: RootState) => state.events.events)
  const dispatch = useDispatch()
  
  const loadEvents = async () => {
    const response = await getEvents()
    dispatch(addEvents(response))
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <HomeBreadcrumbs />

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {events.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ color: 'text.primary' }}>No events available.</Typography>
          </Grid>
        )}

        {events.map((event: Event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="140" image={event.image} alt={event.title} />
              <CardContent>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.category} — {event.date} {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">{event.location} — {event.venue}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Book</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  )
}

function HomeBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ color: 'text.primary' }}>Events</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Home