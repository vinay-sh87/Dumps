package org.example;

import java.sql.*;

public class UpdateStudent {
    public static void main(String args[]) {
        String url = "jdbc:mysql://localhost:3306/student_db";
        String username = "root";
        String password = "Vinay@0011";

        int studentId = 3;
        String updatedGrade = "A++";

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = DriverManager.getConnection(url, username, password);
            String query = "UPDATE students SET grade = ? WHERE id = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, updatedGrade);
            preparedStatement.setInt(2, studentId);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student updated successfully...");
            } else {
                System.out.println("No student found with this id...");
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
