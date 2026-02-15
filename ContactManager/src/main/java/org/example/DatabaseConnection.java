package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String url = "jdbc:mysql://127.0.0.1:3306/contact_manager?autoReconnect=true&useSSL=false";
    private static final String username = "root";
    private static final String password = "Vinay@0011";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection closed");
            } catch (SQLException e) {
                System.out.println("Error closing connection");
                e.printStackTrace();
            }
        }
    }

}
