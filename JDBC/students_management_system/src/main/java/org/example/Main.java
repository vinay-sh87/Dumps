package org.example;


import org.example.dao.StudentDAO;
import org.example.services.StudentService;

import java.util.Scanner;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final StudentService studentService = new StudentService();

    public static void main(String[] args) {
        while (true) {
            System.out.println("----Student Management System----");
            System.out.println("1. Add student");
            System.out.println("2. View all students");
            System.out.println("3. Search student by id");
            System.out.println("4. Updated student");
            System.out.println("5. Delete student");
            System.out.println("6. Search student by name");
            System.out.println("0. Exit");
            System.out.println("----------------------------------");
            int choice = scanner.nextInt();
            scanner.nextLine();
            switch (choice) {
                case 1:
                    studentService.addStudent();
                    break;
                case 2:
                    studentService.viewAllStudents();
                    break;
                case 3:
                    studentService.searchById();
                    break;
                case 4:
                    studentService.updateStudent();
                    break;
                case 5:
                    studentService.deleteStudent();
                    break;
                case 6:
                    studentService.searchByName();
                    break;
                case 0:
                    System.out.println("Exit the program...");
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid choice...");
            }
        }
    }
}



