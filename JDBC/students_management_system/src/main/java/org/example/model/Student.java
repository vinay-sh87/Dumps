package org.example.model;

public class Student {
    private int id;
    private String name;
    private String email;
    private int age;
    private String grade;

    public Student() {
    }

    public Student(String name, String email, int age, String grade) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.grade = grade;
    }

    public Student(int id, String name, String email, int age, String grade) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.grade = grade;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGrade() {
        return this.grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", grade='" + grade + '\'' +
                '}';
    }

}
















