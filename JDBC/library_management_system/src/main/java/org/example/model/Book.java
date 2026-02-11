package org.example.model;

import java.time.LocalDateTime;

public class Book {
    private int id;
    private String title;
    private String author;
    private String isbn;
    private String publisher;
    private int publishedYear;
    private int totalCopies;
    private int availableCopies;
    private String category;
    private LocalDateTime createdAt;

    public Book(String title, String author, String isbn, String publisher, int publishedYear, int totalCopies, String category) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publisher = publisher;
        this.publishedYear = publishedYear;
        this.totalCopies = totalCopies;
        this.category = category;
    }

    // constructor for existing book
    public Book(int id, String title, String author, String isbn, String publisher, int publishedYear, int totalCopies, int availableCopies,
                String category, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishedYear = publishedYear;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.category = category;
        this.createdAt = createdAt;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return this.isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPublisher() {
        return this.publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPublishedYear() {
        return this.publishedYear;
    }

    public void setPublishedYear(int publishedYear) {
        this.publishedYear = publishedYear;
    }

    public int getTotalCopies() {
        return this.totalCopies;
    }

    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    public int getAvailableCopies() {
        return this.availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return String.format("Book{id=%d, title='%s', author='%s', isbn='%s', available=%d/%d}",
                id, title, author, isbn, availableCopies, totalCopies);
    }
}
