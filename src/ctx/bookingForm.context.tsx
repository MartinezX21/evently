import { createContext, useContext, useMemo, useState } from "react";
import type { TicketType } from "../model";

export type BookingAttendee = {
  name: string;
  email: string;
  phone: string;
};

export type BookingTicketSelection = {
  ticketId: string;
  ticketName: string;
  price: number;
  quantity: number;
  attendees: BookingAttendee[];
};

export type BookingFormContextValue = {
  selectedTickets: BookingTicketSelection[];
  addTicket: (ticket: TicketType, quantity?: number) => void;
  updateTicketQuantity: (ticketId: string, quantity: number) => void;
  updateAttendee: (ticketId: string, attendeeIndex: number, field: keyof BookingAttendee, value: string) => void;
  removeTicket: (ticketId: string) => void;
  resetForm: () => void;
};

const BookingFormContext = createContext<BookingFormContextValue | undefined>(undefined);

export function BookingFormProvider({ children }: { children: React.ReactNode }) {
  const [selectedTickets, setSelectedTickets] = useState<BookingTicketSelection[]>([]);

  const addTicket = (ticket: TicketType, quantity = 1) => {
    setSelectedTickets((current) => {
      const existing = current.find((item) => item.ticketId === ticket.id);

      if (existing) {
        return current.map((item) =>
          item.ticketId === ticket.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                attendees: [
                  ...item.attendees,
                  ...Array.from({ length: quantity }, () => ({ name: "", email: "", phone: "" })),
                ],
              }
            : item
        );
      }

      return [
        ...current,
        {
          ticketId: ticket.id,
          ticketName: ticket.name,
          price: ticket.price,
          quantity,
          attendees: Array.from({ length: quantity }, () => ({ name: "", email: "", phone: "" })),
        },
      ];
    });
  };

  const updateTicketQuantity = (ticketId: string, quantity: number) => {
    if (quantity < 1) return;

    setSelectedTickets((current) =>
      current.map((item) => {
        if (item.ticketId !== ticketId) return item;

        const nextAttendees = item.attendees.slice(0, quantity);

        while (nextAttendees.length < quantity) {
          nextAttendees.push({ name: "", email: "", phone: "" });
        }

        return {
          ...item,
          quantity,
          attendees: nextAttendees,
        };
      })
    );
  };

  const updateAttendee = (
    ticketId: string,
    attendeeIndex: number,
    field: keyof BookingAttendee,
    value: string
  ) => {
    setSelectedTickets((current) =>
      current.map((item) =>
        item.ticketId === ticketId
          ? {
              ...item,
              attendees: item.attendees.map((attendee, index) =>
                index === attendeeIndex ? { ...attendee, [field]: value } : attendee
              ),
            }
          : item
      )
    );
  };

  const removeTicket = (ticketId: string) => {
    setSelectedTickets((current) => current.filter((item) => item.ticketId !== ticketId));
  };

  const getTicket = (ticketId: string) => {
    return selectedTickets.find((item) => item.ticketId === ticketId);
  }

  const resetForm = () => setSelectedTickets([]);

  const value = useMemo<BookingFormContextValue>(
    () => ({
      selectedTickets,
      addTicket,
      updateTicketQuantity,
      updateAttendee,
      removeTicket,
      getTicket,
      resetForm,
    }),
    [selectedTickets]
  );

  return <BookingFormContext.Provider value={value}>{children}</BookingFormContext.Provider>;
}

export function useBookingForm() {
  const context = useContext(BookingFormContext);

  if (!context) {
    throw new Error("useBookingForm must be used within a BookingFormProvider");
  }

  return context;
}
