package org.example.service;

import org.example.dao.BorrowDAO;
import org.example.model.Book;
import org.example.model.BorrowRecord;
import org.example.model.Member;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class BorrowService {
    private final BookService bookService;
    private final MemberService memberService;
    private final BorrowDAO borrowDAO;

    public BorrowService(BookService bookService, MemberService memberService, BorrowDAO borrowDAO) {
        this.bookService = bookService;
        this.memberService = memberService;
        this.borrowDAO = borrowDAO;
    }

    // rules
    private static final int MAX_BORROW_LIMIT = 5;
    private static final int BORROW_PERIOD_DAYS = 14;
    private static final double LATE_FEE_PER_DAY = 1.0;

    // borrow a book
    public void borrowBook(String memberId, String isbn) {
        Member member = memberService.getMemberByMemberId(memberId);
        validateMemberCanBorrow(member);

        Book book = bookService.getBookByIsbn(isbn);
        validateBookAvailability(book);

        List<BorrowRecord> currentBorrows = borrowDAO.getCurrentBorrowsByMember(member.getId());
        if (currentBorrows.size() >= MAX_BORROW_LIMIT) {
            throw new IllegalStateException("Member has reached the maximum borrow limit");
        }
        checkForOverdueBooks(currentBorrows);

        LocalDate dueDate = LocalDate.now().plusDays(BORROW_PERIOD_DAYS);
        BorrowRecord borrowRecord = new BorrowRecord(book.getId(), member.getId(), dueDate);

        try {
            borrowDAO.borrowBook(borrowRecord);
            bookService.decreaseAvailableCopies(book.getId());
            System.out.println("Book borrowed successfully...");
            System.out.println("Book : " + book.getId());
            System.out.println("Due date : " + dueDate);
            System.out.println("Return within : " + BORROW_PERIOD_DAYS + " days to avoid late fee");
        } catch (Exception e) {
            throw new RuntimeException("Error borrowing the book: " + e.getMessage());
        }
    }

    // return a book
    public void returnBook(String memberId, String isbn) {
        Member member = memberService.getMemberByMemberId(memberId);
        Book book = bookService.getBookByIsbn(isbn);

        List<BorrowRecord> currentBorrows = borrowDAO.getCurrentBorrowsByMember(member.getId());
        BorrowRecord borrowRecord = currentBorrows.stream().filter(record -> record.getBookId() == book.getId()).findFirst()
                .orElseThrow(() -> new IllegalStateException("This member hasn't borrowed this book or has already returned..."));

        double lateFee = calculateLateFee(borrowRecord.getDueDate(), LocalDate.now());

        try {
            borrowDAO.returnBook(borrowRecord.getId(), LocalDate.now(), lateFee);
            bookService.increaseAvailableCopies(book.getId());

            System.out.println("Book returned successfully!");
            System.out.println("Book : " + book.getTitle());
            System.out.println("Member : " + member.getFullName());
            System.out.println("Borrowed on : " + borrowRecord.getBorrowDate());
            System.out.println("Returned on : " + LocalDate.now());

            if (lateFee > 0) {
                long daysLate = ChronoUnit.DAYS.between(borrowRecord.getBorrowDate(), LocalDate.now());
                System.out.println("Book was " + daysLate + " days late");
                System.out.println("Late fee: $" + String.format("%.2f", lateFee));
            } else {
                System.out.println("returned on time no late fee...");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error processing return " + e.getMessage());
        }
    }

    // public get members borrow history
    public List<BorrowRecord> getMemberBorrowHistory(String memberId) {
        Member member = memberService.getMemberByMemberId(memberId);
        return borrowDAO.getBorrowedBooksByMember(member.getId());
    }

    // get member's currently borrowed books
    public List<BorrowRecord> getMemberCurrentBorrows(String memberId) {
        Member member = memberService.getMemberByMemberId(memberId);
        return borrowDAO.getCurrentBorrowsByMember(member.getId());
    }

    // get all currently borrowed books
    public List<BorrowRecord> getAllCurrentBorrows() {
        return borrowDAO.getCurrentlyBorrowedBooks();
    }

    // get overdue books
    public List<BorrowRecord> getOverdueBooks() {
        borrowDAO.updateOverdueStatus();
        return borrowDAO.getOverdueBooks();
    }

    // get book's borrow history
    public List<BorrowRecord> getBooksBorrowHistory(String isbn) {
        Book book = bookService.getBookByIsbn(isbn);
        return borrowDAO.getBorrowHistoryByBook(book.getId());
    }

    // check if a member can borrow books
    public boolean canMemberBorrow(String memberId) {
        try {
            Member member = memberService.getMemberByMemberId(memberId);
            if (member.getStatus().equals("active")) {
                return false;
            }
            List<BorrowRecord> currentBorrows = borrowDAO.getCurrentBorrowsByMember(member.getId());
            if (currentBorrows.size() >= MAX_BORROW_LIMIT) {
                return false;
            }
            for (BorrowRecord record : currentBorrows) {
                if (record.getDueDate().isBefore(LocalDate.now())) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    // get currently borrowed count
    public int getCurrentlyBorrowedCount() {
        return borrowDAO.getCurrentlyBorrowedCount();
    }

    // get total borrows count
    public int getAllBorrowedCount() {
        return borrowDAO.getTotalBorrowsCount();
    }

    // get total late fee collected
    public double getTotalLateFeeCollected() {
        return borrowDAO.getTotalLateFees();
    }

    public int getMaxBorrowLimit() {
        return MAX_BORROW_LIMIT;
    }

    public int getBorrowPeriodDays() {
        return BORROW_PERIOD_DAYS;
    }

    public static double getLateFeePerDay() {
        return LATE_FEE_PER_DAY;
    }

    // calculate late fee
    private double calculateLateFee(LocalDate dueDate, LocalDate returnDate) {
        if (returnDate.isAfter(dueDate)) {
            long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            return daysLate * LATE_FEE_PER_DAY;
        }
        return 0.0;
    }

    // validate if member can borrow a book
    private void validateMemberCanBorrow(Member member) {
        if (member.getStatus().equals("active")) {
            throw new IllegalStateException("Member status is " + member.getStatus() + " cannot borrow books");
        }
    }

    // validate book availability
    private void validateBookAvailability(Book book) {
        if (book.getAvailableCopies() <= 0) {
            throw new IllegalStateException("No copies of " + book.getTitle() + " are currently available!");
        }
    }

    // check for overdue books
    private void checkForOverdueBooks(List<BorrowRecord> currentBorrows) {
        for (BorrowRecord record : currentBorrows) {
            if (record.getDueDate().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Member has overdue books, return first please");
            }
        }
    }

}
