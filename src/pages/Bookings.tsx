import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "react-router";

function Bookings() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BookingsBreadcrumbs />
    </Container>
  )
}

function BookingsBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" color="inherit">
          Home
        </Link>
        <Typography sx={{ color: 'text.primary' }}>My Bookings</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Bookings;