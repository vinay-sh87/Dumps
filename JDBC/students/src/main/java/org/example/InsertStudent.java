package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class InsertStudent {
    public static void main(String args[]) {
        String url = "jdbc:mysql://localhost:3306/student_db";
        String username = "root";
        String password = "Vinay@0011";

        Scanner sc = new Scanner(System.in);
        System.out.println("Enter student name: ");
        String name = sc.nextLine();

        System.out.println("Enter student email: ");
        String email = sc.nextLine();

        System.out.println("Enter student age : ");
        int age = sc.nextInt();
        sc.nextLine();

        System.out.println("Enter student grade : ");
        String grade = sc.nextLine();

        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            connection = DriverManager.getConnection(url, username, password);
            String query = "INSERT INTO students (name,email,age,grade) VALUES (?,?,?,?)";
            preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, name);
            preparedStatement.setString(2, email);
            preparedStatement.setInt(3, age);
            preparedStatement.setString(4, grade);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student added successfully...");
            }
        } catch (SQLException e) {
            System.out.println("Error : " + e.getMessage());
        } finally {
            try {
                if (preparedStatement != null) preparedStatement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


    }
}
