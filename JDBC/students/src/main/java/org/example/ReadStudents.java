package org.example;

import javax.swing.plaf.nimbus.State;
import java.sql.*;

public class ReadStudents {
    public static void main(String args[]) {
        String url = "jdbc:mysql://localhost:3306/student_db";
        String username = "root";
        String password = "Vinay@0011";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            connection = DriverManager.getConnection(url, username, password);
            statement = connection.createStatement();
            String query = "SELECT * FROM students";
            resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                int age = resultSet.getInt("age");
                String grade = resultSet.getString("grade");

                System.out.println("Id: " + id);
                System.out.println("Name: " + name);
                System.out.println("Email: " + email);
                System.out.println("Age: " + age);
                System.out.println("Grade: " + grade);
                System.out.println("-------------");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if (connection != null) connection.close();
                if (statement != null) connection.close();
                if (statement != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
