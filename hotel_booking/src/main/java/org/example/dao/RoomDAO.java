package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.model.Room;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RoomDAO {

    // create
    public int save(Room room) throws Exception {
        String query = "insert into rooms (room_number,type,price_per_night,status) values(?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, room.getRoomNumber());
            preparedStatement.setString(2, room.getType());
            preparedStatement.setDouble(3, room.getPricePerNight());
            preparedStatement.setString(4, room.getStatus());

            preparedStatement.executeUpdate();
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
            throw new SQLException("Failed to get generated room id");
        }
    }

    // find by id
    public Room findById(int id) throws Exception {
        String query = "select * from rooms where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return mapRowToRoom(resultSet);
            }
        }
        return null;
    }

    // find all
    public List<Room> findAll() throws Exception {
        String query = "select * from rooms";
        List<Room> rooms = new ArrayList<>();
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query); ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                rooms.add(mapRowToRoom(resultSet));
            }
        }
        return rooms;
    }

    // update status
    public void updateStatus(int id, String status) throws Exception {
        String query = "update rooms set status = ? where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, status);
            preparedStatement.setInt(2, id);
            if (preparedStatement.executeUpdate() == 0) {
                System.out.println("Room not found...");
            }
        }
    }

    // update status (transactional)
    public void updateStatus(Connection connection, int id, String status) throws Exception {
        String query = "update rooms set status = ? where id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, status);
            preparedStatement.setInt(2, id);
            if (preparedStatement.executeUpdate() == 0) {
                System.out.println("Room not found...");
            }
        }
    }

    // delete by id
    public boolean deleteById(int id) throws Exception {
        String query = "delete from rooms where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            return preparedStatement.executeUpdate() > 0;
        }
    }

    public List<Room> findAvailableRooms(LocalDate checkIn, LocalDate checkOut) throws Exception {
        String query = """
                Select *
                from rooms
                where id not in (
                    select room_id
                    from bookings
                    where status = 'CONFIRMED'
                        and not (
                            ? <= check_in
                            or
                            ? >= check_out
                        )
                )
                """;
        List<Room> rooms = new ArrayList<>();
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setDate(1, Date.valueOf(checkOut));
            preparedStatement.setDate((2), Date.valueOf(checkIn));

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                rooms.add(mapRowToRoom(resultSet));
            }
        }
        return rooms;
    }


    private Room mapRowToRoom(ResultSet resultSet) throws Exception {
        Room room = new Room();
        room.setId(resultSet.getInt("id"));
        room.setRoomNumber(resultSet.getString("room_number"));
        room.setType(resultSet.getString("type"));
        room.setPricePerNight(resultSet.getDouble("price_per_night"));
        room.setStatus(resultSet.getString("status"));
        return room;
    }
}
