package org.example.config;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConfig {
    private static final String url = "jdbc:mysql://localhost:3306/library_db";
    private static final String username = "root";
    private static final String password = "Vinay@0011";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    public static void testConnection() {
        try (Connection connection = getConnection()) {
            System.out.println("Database connected successfully...");
            System.out.println("Database : " + connection.getCatalog());
        } catch (SQLException e) {
            System.out.println("Failed to connect database...");
            e.printStackTrace();
        }
    }
}
