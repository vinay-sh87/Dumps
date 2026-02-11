package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCConnectionTest {
    public static void main(String args[]) {
        String url = "jdbc:mysql://localhost:3306/student_db";
        String username = "root";
        String password = "Vinay@0011";
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(url, username, password);
            System.out.println("connected to database successfully....");
            System.out.println("Database " + connection.getCatalog());
        } catch (SQLException e) {
            System.err.println("connection failed...");
            e.printStackTrace();
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    connection.close();
                    System.out.println("connection closed...");
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
