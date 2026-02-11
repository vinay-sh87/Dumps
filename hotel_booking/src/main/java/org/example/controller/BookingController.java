package org.example.controller;

import org.example.model.Booking;
import org.example.service.BookingService;

public class BookingController {
    private final BookingService bookingService = new BookingService();

    public int bookRoom(Booking booking) throws Exception {
        return bookingService.createBooking(booking);
    }

    public void cancelBooking(int bookingId) throws Exception {
        bookingService.cancelBooking(bookingId);
    }
}
