package org.example.service;

import org.example.model.LibraryStats;

public class LibraryStatsService {
    private final BookService bookService;
    private final MemberService memberService;
    private final BorrowService borrowService;

    public LibraryStatsService(BookService bookService, MemberService memberService, BorrowService borrowService) {
        this.bookService = bookService;
        this.memberService = memberService;
        this.borrowService = borrowService;
    }

    public LibraryStats getLibraryStats() {
        return new LibraryStats(
                bookService.getTotalBooksCount(),
                bookService.getAvailableBooksCount(),
                memberService.getTotalMembersCount(),
                memberService.getActiveMembersCount(),
                borrowService.getCurrentlyBorrowedCount(),
                borrowService.getAllBorrowedCount(),
                borrowService.getTotalLateFeeCollected()
        );
    }

    public void displayStatistics() {
        LibraryStats stats = getLibraryStats();
        stats.display();
    }
}
