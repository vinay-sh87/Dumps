package org.example.model;

public class LibraryStats {
    private final int totalBooks;
    private final int availableBooks;
    private final int totalMembers;
    private final int activeMembers;
    private final int currentlyBorrowed;
    private final int totalBorrows;
    private final double totalLateFees;

    public LibraryStats(int totalBooks, int availableBooks, int totalMembers,
                        int activeMembers, int currentlyBorrowed, int totalBorrows,
                        double totalLateFees) {
        this.totalBooks = totalBooks;
        this.availableBooks = availableBooks;
        this.totalMembers = totalMembers;
        this.activeMembers = activeMembers;
        this.currentlyBorrowed = currentlyBorrowed;
        this.totalBorrows = totalBorrows;
        this.totalLateFees = totalLateFees;
    }

    public void display() {
        System.out.println("\n" + "=".repeat(50));
        System.out.println("   LIBRARY STATISTICS");
        System.out.println("=".repeat(50));
        System.out.println("   Books:");
        System.out.println("   Total Books: " + totalBooks);
        System.out.println("   Available: " + availableBooks);
        System.out.println("   Borrowed: " + (totalBooks - availableBooks));
        System.out.println();
        System.out.println("   Members:");
        System.out.println("   Total Members: " + totalMembers);
        System.out.println("   Active Members: " + activeMembers);
        System.out.println();
        System.out.println("   Borrowing:");
        System.out.println("   Currently Borrowed: " + currentlyBorrowed);
        System.out.println("   Total Borrows (All Time): " + totalBorrows);
        System.out.println();
        System.out.println("   Financials:");
        System.out.println("   Total Late Fees Collected: $" + String.format("%.2f", totalLateFees));
        System.out.println("=".repeat(50));
    }

    // Getters
    public int getTotalBooks() { return totalBooks; }
    public int getAvailableBooks() { return availableBooks; }
    public int getTotalMembers() { return totalMembers; }
    public int getActiveMembers() { return activeMembers; }
    public int getCurrentlyBorrowed() { return currentlyBorrowed; }
    public int getTotalBorrows() { return totalBorrows; }
    public double getTotalLateFees() { return totalLateFees; }
}