package org.example.config;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConfig {
    private static final Dotenv dotenv = Dotenv.load();
    private static final String url = dotenv.get("DB_URL");
    private static final String username = dotenv.get("DB_USERNAME");
    private static final String password = dotenv.get("DB_PASSWORD");

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }
}
