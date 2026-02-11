package org.example.model;

import java.time.LocalDate;

public class BorrowRecord {
    private int id;
    private int bookId;
    private int memberId;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double lateFee;
    private String status;
    private String bookTitle;
    private String memberName;

    public BorrowRecord(int bookId, int memberId, LocalDate dueDate) {
        this.bookId = bookId;
        this.memberId = memberId;
        this.dueDate = dueDate;
        this.borrowDate = LocalDate.now();
        this.status = "borrowed";
        this.lateFee = 0.00;
    }

    public BorrowRecord(int id, int bookId, int memberId, LocalDate borrowDate,
                        LocalDate dueDate, LocalDate returnDate, double lateFee, String status) {
        this.id = id;
        this.bookId = bookId;
        this.memberId = memberId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.lateFee = lateFee;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(LocalDate borrowDate) {
        this.borrowDate = borrowDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getLateFee() {
        return lateFee;
    }

    public void setLateFee(double lateFee) {
        this.lateFee = lateFee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    @Override
    public String toString() {
        return String.format("BorrowRecord{id=%d, book='%s', member='%s', borrowDate=%s, dueDate=%s, status='%s'}",
                id, bookTitle, memberName, borrowDate, dueDate, status);
    }
}
