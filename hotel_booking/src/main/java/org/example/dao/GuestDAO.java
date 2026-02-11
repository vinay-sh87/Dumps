package org.example.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.example.config.DatabaseConfig;
import org.example.model.Guest;

public class GuestDAO {
    // crate guest
    public int save(Guest guest) throws Exception {
        String query = "insert into guests (name,email,phone) values(?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, guest.getName());
            preparedStatement.setString(2, guest.getEmail());
            preparedStatement.setString(3, guest.getPhone());
            preparedStatement.executeUpdate();
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
            throw new SQLException("Failed to get generated guest id");
        }
    }

    // find guest
    public Guest findById(int id) throws Exception {
        String query = "select * from guests where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return mapRowToGuest(resultSet);
            }
            return null;
        }
    }

    // get all the guests
    public List<Guest> findAll() throws Exception {
        List<Guest> guests = new ArrayList<>();
        String query = "select * from guests";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                guests.add(mapRowToGuest(resultSet));
            }
        }
        return guests;
    }

    // delete guest
    public boolean deleteById(int id) throws Exception {
        String query = "delete from guests where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            return preparedStatement.executeUpdate() > 0;
        }
    }

    // map row to guest obj
    private Guest mapRowToGuest(ResultSet resultSet) throws Exception {
        return new Guest(
                resultSet.getString("name"),
                resultSet.getString("email"),
                resultSet.getString("phone")
        );
    }
}
