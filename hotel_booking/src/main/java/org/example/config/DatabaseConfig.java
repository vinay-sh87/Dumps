package org.example.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConfig {
    private static String url = "jdbc:mysql://localhost:3306/hotel_db?autoReconnect=true&useSSL=false";
    private static String username = "root";
    private static String password = "Vinay@0011";

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection(url, username, password);
    }
}
