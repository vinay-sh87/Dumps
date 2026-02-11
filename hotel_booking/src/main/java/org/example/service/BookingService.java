package org.example.service;

import org.example.config.DatabaseConfig;
import org.example.dao.BookingDAO;
import org.example.dao.RoomDAO;
import org.example.model.Booking;

import java.sql.*;

public class BookingService {
    private final BookingDAO bookingDAO = new BookingDAO();
    private final RoomDAO roomDAO = new RoomDAO();

    // create booking (transactional)
    public int createBooking(Booking booking) throws Exception {
        Connection connection = null;
        try {
            connection = DatabaseConfig.getConnection();
            connection.setAutoCommit(false);
            // availability check
            if (!bookingDAO.isRoomAvailable(connection, booking.getRoomId(), booking.getCheckIn(), booking.getCheckout())) {
                throw new Exception("room already booked for these dates");
            }
            int bookingId = bookingDAO.insert(connection, booking);
            roomDAO.updateStatus(connection, booking.getRoomId(), "BOOKED");
            connection.commit();
            return bookingId;
        } catch (Exception e) {
            if (connection != null) {
                connection.rollback();
            }
            throw e;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }

    }

    // cancel booking (transactional)
    public void cancelBooking(int bookingId) throws Exception {
        Connection connection = null;
        try {
            connection = DatabaseConfig.getConnection();
            connection.setAutoCommit(false);
            Booking booking = bookingDAO.findBookingById(connection, bookingId);
            if (booking == null) {
                throw new Exception("Booking not found");
            }
            bookingDAO.updateStatus(connection, bookingId, "CANCELLED");
            roomDAO.updateStatus(connection, booking.getRoomId(), "AVAILABLE");
            connection.commit();
        } catch (Exception e) {
            if (connection != null) connection.rollback();
            throw new Exception("Cancel booking failed" + e.getMessage());
        } finally {
            if (connection != null) connection.close();
        }
    }


}
