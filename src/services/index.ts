import type { Booking } from "../model";

// GET /events (with optional query params for filters)
export async function getEvents(filters?: { category?: string, dateFrom?: string; dateTo?: string; priceFrom?: number; priceTo?: number }) {
    let url = "/events"
    if (filters) {
        const queryParams = new URLSearchParams()
        if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom)
        if (filters.dateTo) queryParams.append("dateTo", filters.dateTo)
        if (filters.category) queryParams.append("category", filters.category)
        url += `?${queryParams.toString()}`
    }
    const response = await fetch(getCompleteUrl(url))
    return await response.json()
}

// GET /events/:id

// GET /bookings?userId=user1

// POST /bookings
export const addNewBooking = async (bookingData: Booking) => {
    const response = await fetch(getCompleteUrl('/bookings'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

// PATCH /bookings/:id (for cancellation)

const getCompleteUrl = (endpointPath: string) => `http://localhost:4000${endpointPath}`