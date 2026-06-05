import { Box, Card, CardContent, Checkbox, TextField, Typography } from "@mui/material";
import type { Event } from "../model";
import { useBookingForm } from "../context/bookingForm.context";
import { useCallback } from "react";

function TicketSelection({ event }: { event: Event }) {
    const { selectedTickets, addTicket, removeTicket, updateTicketQuantity } = useBookingForm();

    const getTicket = useCallback(
        (ticketId: string) => {
            return selectedTickets.find((item) => item.ticketId === ticketId);
        },
        [selectedTickets]
    );

    const toggleTicket = (ticketId: string) => {
        if (!event) return;

        const ticket = event.ticketTypes.find((item) => item.id === ticketId);
        if (!ticket) return;

        const existing = getTicket(ticketId);
        if (existing) {
            removeTicket(ticketId);
        } else {
            addTicket(ticket, 1);
        }
    };
    
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Select tickets</Typography>
            {event.ticketTypes.map((ticket) => (
            <Card key={ticket.id} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                    <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{ticket.name}</Typography>
                    <Typography variant="body2" color="text.secondary">${ticket.price} each</Typography>
                    <Typography variant="body2" color="text.secondary">{ticket.available} available</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                        size="small"
                        label="Qty"
                        type="number"
                        value={getTicket(ticket.id)?.quantity ?? 1}
                        onChange={(e) => updateTicketQuantity(ticket.id, Number(e.target.value))}
                        slotProps={{ htmlInput: { min: 1 } }}
                        sx={{ width: 90 }}
                        disabled={!getTicket(ticket.id)}
                    />
                    <Checkbox
                        checked={!!getTicket(ticket.id)}
                        onChange={() => toggleTicket(ticket.id)}
                    />
                    </Box>
                </Box>
                </CardContent>
            </Card>
            ))}
        </Box>
    );
}

export default TicketSelection;