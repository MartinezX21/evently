export type TicketType = {
    id: string
    name: string
    price: number
    available: number
}

export type Event = {
    id: string
    title: string
    description: string
    category: string
    date: string
    time: string
    location: string
    venue: string
    image: string
    organizerName: string
    ticketTypes: TicketType[]
}

type BookingTicket = {
    type: string
    quantity: number
    price: number
}

type BookingAttendee = {
    name: string
    email: string
    phone: string
}

export type Booking = {
    id: string
    userId: string
    eventId: string
    eventTitle: string
    eventDate: string
    tickets: BookingTicket[]
    attendees: BookingAttendee[]
    totalAmount: number
    status: string
    bookingDate: string
    referenceNumber: string
}