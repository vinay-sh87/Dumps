package org.example;

import java.sql.*;
import java.util.Scanner;

public class DeleteStudent {
    public static void main(String args[]) {
        String url = "jdbc:mysql://localhost:3306/student_db";
        String username = "root";
        String password = "Vinay@0011";
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the id of the student to delete");
        int studentId = sc.nextInt();

        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            connection = DriverManager.getConnection(url, username, password);
            String query = "DELETE FROM STUDENTS WHERE id = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, studentId);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student deleted successfully...");
            } else {
                System.out.println("Student not found with the id...");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (connection != null) connection.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }
}
