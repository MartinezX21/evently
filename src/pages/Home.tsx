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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <HomeBreadcrumbs />

      <div className="events-grid">
        {filteredEvents.length === 0 && (
          <Typography sx={{ color: 'text.primary' }}>No events available.</Typography>
        )}

        {filteredEvents.map((event: Event) => <EventCard key={event.id} event={event} />)}
      </div>

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