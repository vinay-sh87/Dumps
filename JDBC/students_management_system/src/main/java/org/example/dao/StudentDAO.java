package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.model.Student;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
    // add a student
    public void addStudent(Student student) {
        String query = "INSERT INTO students (name,email,age,grade) VALUES(?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getEmail());
            preparedStatement.setInt(3, student.getAge());
            preparedStatement.setString(4, student.getGrade());
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student added successfully");
            }
        } catch (SQLException e) {
            System.out.println("Error adding student...");
            e.printStackTrace();
        }
    }

    // get all the students
    public List<Student> getAllStudents() {
        ArrayList<Student> students = new ArrayList<>();
        String query = "SELECT * FROM students";

        try (Connection connection = DatabaseConfig.getConnection(); Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {
            while (resultSet.next()) {
                Student student = new Student(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("email"),
                        resultSet.getInt("age"),
                        resultSet.getString("grade")
                );
                students.add(student);
            }
        } catch (SQLException e) {
            System.out.println("Failed reading students...");
        }
        return students;
    }

    // get student by id
    public Student getStudentById(int id) {
        String query = "SELECT * FROM students WHERE id = ? ";
        Student student = null;
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                student = new Student(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("email"),
                        resultSet.getInt("age"),
                        resultSet.getString("grade")
                );
            }
            resultSet.close();
        } catch (SQLException e) {
            System.out.println("Error fetching student...");
        }
        return student;
    }

    // update student
    public void updateStudent(Student student) {
        String query = "UPDATE students SET name = ?, email = ?, age = ?, grade = ? WHERE id = ? ";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getEmail());
            preparedStatement.setInt(3, student.getAge());
            preparedStatement.setString(4, student.getGrade());
            preparedStatement.setInt(5, student.getId());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student updated successfully...");
            } else {
                System.out.println("No student found with the id...");
            }
        } catch (SQLException e) {
            System.out.println("Error updating student...");
        }
    }

    // delete student
    public void delete(int id) {
        String query = "DELETE FROM students WHERE id = ? ";

        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student deleted successfully");
            } else {
                System.out.println("no student found with the id provided");
            }
        } catch (SQLException e) {
            System.out.println("Error deleting student..." + e.getMessage());
        }
    }

    // public void getByName
    public List<Student> searchStudentByName(String search) {
        List<Student> students = new ArrayList<>();
        String query = "SELECT * FROM students WHERE name LIKE ? ";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, "%" + search + "%");
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Student student = new Student(
                        resultSet.getInt("id"),
                        resultSet.getString("name"),
                        resultSet.getString("email"),
                        resultSet.getInt("age"),
                        resultSet.getString("grade")
                );
                students.add(student);
            }
            resultSet.close();
        } catch (SQLException e) {
            System.out.println("Failed to fetch students...");
        }
        return students;
    }

}















