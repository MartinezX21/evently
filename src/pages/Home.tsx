import { 
  Breadcrumbs, 
  Container, 
  Typography
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { getEvents } from "../services";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Event } from "../model";
import { eventsReceived, selectAllEvents } from "../store/eventsSlice";
import EventCard from "../components/EventCard";

function Home() {
  const events = useSelector(selectAllEvents) || []
  const favoriteEventIds = useSelector((state: RootState) => state.events.favoriteEventsIds)
  const searchTerm = useSelector((state: RootState) => state.events.searchTerm)
  const dispatch = useDispatch()
  
  const loadEvents = async () => {
    const response = await getEvents()
    dispatch(eventsReceived(response))
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter((event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const favoriteEvents = useMemo(
    () => filteredEvents.filter((event) => favoriteEventIds.includes(event.id)),
    [favoriteEventIds, filteredEvents]
  );

  const otherEvents = useMemo(
    () => filteredEvents.filter((event) => !favoriteEventIds.includes(event.id)),
    [favoriteEventIds, filteredEvents]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <HomeBreadcrumbs />
      <Typography variant="h4" sx={{ fontWeight: 700 }}>All Events</Typography>

      {filteredEvents.length === 0 && (
        <Typography sx={{ color: 'text.primary', mt: 2 }}>No events available.</Typography>
      )}

      {favoriteEvents.length > 0 && (
        <>
          {otherEvents.length > 0 && (
            <Typography variant="h5" sx={{ mt: 3, mb: 2, fontWeight: 700 }}>Favorites</Typography>
          )}
          <div className="events-grid">
            {favoriteEvents.map((event: Event) => <EventCard key={event.id} event={event} />)}
          </div>
        </>
      )}

      {otherEvents.length > 0 && (
        <>
          {favoriteEvents.length > 0 && (
            <Typography variant="h5" sx={{ mt: 3, mb: 2, fontWeight: 700 }}>Browse Events</Typography>
          )}
          <div className="events-grid">
            {otherEvents.map((event: Event) => <EventCard key={event.id} event={event} />)}
          </div>
        </>
      )}

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