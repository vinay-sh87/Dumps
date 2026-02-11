package org.example;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConfig {
    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/company_db?autoReconnect=true&useSSL=false", "root", "Vinay@0011");


    }
}

