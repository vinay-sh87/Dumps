package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.model.Booking;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BookingDAO {

    // insert new booking
    public int insert(Connection connection, Booking booking) throws SQLException {
        String query = "insert into bookings (guest_id,room_id,check_in,check_out,status) values(?,?,?,?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, booking.getGuestId());
            preparedStatement.setInt(2, booking.getRoomId());
            preparedStatement.setDate(3, Date.valueOf(booking.getCheckIn()));
            preparedStatement.setDate(4, Date.valueOf(booking.getCheckout()));
            preparedStatement.setString(5, booking.getStatus());

            preparedStatement.executeUpdate();
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        }
        throw new SQLException("Booking insertion failed....");
    }

    // update booking status
    public void updateStatus(Connection connection, int bookingId, String status) throws Exception {
        String query = "update bookings set status = ? where id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, status);
            preparedStatement.setInt(2, bookingId);
            if (preparedStatement.executeUpdate() == 0) {
                throw new SQLException("Booking not found...");
            }
        }
    }

    public List<Booking> findByGuestId(int id) throws Exception {
        String query = "select * from bookings where guest_id = ?";
        List<Booking> bookings = new ArrayList<>();
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                bookings.add(mapRow(resultSet));
            }
        }
        return bookings;
    }

    public Booking findBookingById(Connection connection, int id) throws Exception {
        String query = "select * from bookings where id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return mapRow(resultSet);
            }
            return null;
        }
    }

    // check room availability
    public boolean isRoomAvailable(Connection connection, int roomId, LocalDate checkIn, LocalDate checkOut) throws SQLException {
        String query = """
                select count(*)
                from bookings
                where room_id = ?
                and status = 'CONFIRMED'
                and not(
                    ? <= check_in
                    or
                    ? >= check_out
                )
                """;
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, roomId);
            preparedStatement.setDate(2, Date.valueOf(checkOut));
            preparedStatement.setDate(3, Date.valueOf(checkIn));
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            return resultSet.getInt(1) == 0;

        }

    }


    private Booking mapRow(ResultSet resultSet) throws SQLException {
        Booking booking = new Booking();
        booking.setId(resultSet.getInt("id"));
        booking.setGuestId(resultSet.getInt("guest_id"));
        booking.setRoomId(resultSet.getInt("room_id"));
        booking.setCheckIn(resultSet.getDate("check_in").toLocalDate());
        booking.setCheckout(resultSet.getDate("check_out").toLocalDate());
        booking.setStatus(resultSet.getString("status"));
        return booking;
    }

}
