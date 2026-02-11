package org.example.services;

import org.example.dao.StudentDAO;
import org.example.model.Student;

import java.util.List;
import java.util.Scanner;

public class StudentService {
    private static StudentDAO studentDAO = new StudentDAO();
    private static Scanner sc = new Scanner(System.in);

    public void addStudent() {
        System.out.println("\n Add new student");
        System.out.println("Name: ");
        String name = sc.nextLine();

        System.out.println("Email: ");
        String email = sc.nextLine();

        System.out.println("Age: ");
        int age = sc.nextInt();
        sc.nextLine();

        System.out.println("Grade: ");
        String grade = sc.nextLine();

        Student student = new Student(name, email, age, grade);
        studentDAO.addStudent(student);
    }

    public void viewAllStudents() {
        System.out.println("\n Get all the students");
        List<Student> students = studentDAO.getAllStudents();
        if (students.isEmpty()) {
            System.out.println("No students found...");
        } else {
            for (Student student : students) {
                System.out.println(student);
            }
        }
    }

    public void searchById() {
        System.out.println("\n Enter Student ID: ");
        int id = sc.nextInt();
        Student student = studentDAO.getStudentById(id);
        if (student != null) {
            System.out.println(student);
        } else {
            System.out.println("student not found...");
        }
    }

    public void updateStudent() {
        System.out.println("\n Enter student id to update");
        int id = sc.nextInt();
        sc.nextLine();
        Student student = studentDAO.getStudentById(id);
        if (student == null) {
            System.out.println("no student found with this id....");
            return;
        }
        System.out.println("\n Current details..." + student);
        System.out.println("New name(or press enter to keep the current ):");
        String name = sc.nextLine();
        if (!name.isEmpty()) student.setName(name);

        System.out.println("New email (or press enter to keep the current): ");
        String email = sc.nextLine();
        if (!email.isEmpty()) student.setEmail(email);

        System.out.println("New age (or press enter to keep the current):");
        String age = sc.nextLine();
        if (!age.isEmpty()) {
            student.setAge(Integer.parseInt(age));
        }

        System.out.println("Enter Grade (or press Enter to keep the current): ");
        String grade = sc.nextLine();
        if (!grade.isEmpty()) student.setGrade(grade);

        studentDAO.updateStudent(student);
    }

    public void deleteStudent() {
        System.out.println("\n Enter student id to delete: ");
        int id = sc.nextInt();
        studentDAO.delete(id);
    }

    public void searchByName() {
        System.out.println("\n Enter name to search");
        String name = sc.nextLine();
        List<Student> students = studentDAO.searchStudentByName(name);
        if (students.isEmpty()) {
            System.out.println("No students found....");
        } else {
            System.out.println("\n Search results");
            for (Student student : students) {
                System.out.println(student);
            }
        }
    }
}
