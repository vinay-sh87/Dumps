package org.example.service;

import org.example.dao.BookDAO;
import org.example.exception.BookNotFoundException;
import org.example.model.Book;

import java.util.List;

public class BookService {
    private final BookDAO bookDAO;

    public BookService() {
        this.bookDAO = new BookDAO();
    }

    public BookService(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

    // add book
    public void addBook(String title, String author, String isbn, String publisher, int publishedYear, int totalCopies, String category) {
        validateBookInput(title, isbn, totalCopies);
        Book book = new Book(title, author, isbn, publisher, publishedYear, totalCopies, category);
        bookDAO.addBook(book);
    }

    // get book by isbn
    public Book getBookByIsbn(String isbn) {
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN cannot be empty!");
        }
        return bookDAO.getBookByIsbn(isbn);
    }

    // get book by id
    public Book getBookById(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid book id!");
        }
        return bookDAO.getBookById(id);
    }

    // get all books
    public List<Book> getAllBooks() {
        return bookDAO.getAllBooks();
    }

    // get available books
    public List<Book> getAvailableBooks() {
        return bookDAO.getAvailableBooks();
    }

    // search by title or author
    public List<Book> getBooks(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            throw new IllegalArgumentException("Search term cannot be empty");
        }
        List<Book> booksByTitle = bookDAO.searchBooksByTitle(searchTerm);
        List<Book> booksByAuthor = bookDAO.searchBooksByAuthor(searchTerm);

        booksByTitle.addAll(booksByAuthor.stream().filter(book -> !booksByTitle.contains(book)).toList());
        return booksByTitle;
    }

    // get books by category
    public List<Book> getBooksByCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty...");
        }
        return bookDAO.getBooksByCategory(category);
    }

    // update book details
    public void updateBook(int bookId, String title, String author, String publisher, int publishedYear, int totalCopies, String category) {
        validateBookInput(title, null, totalCopies);
        Book book = bookDAO.getBookById(bookId);
        int borrowedCopies = book.getTotalCopies() - book.getAvailableCopies();
        if (totalCopies < borrowedCopies) {
            throw new IllegalArgumentException("Cannot set total copies to " + totalCopies + " because " + borrowedCopies + " copies are currently borrowed");
        }
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setPublishedYear(publishedYear);
        book.setTotalCopies(totalCopies);
        book.setCategory(category);

        book.setAvailableCopies(totalCopies - borrowedCopies);
        bookDAO.updateBook(book);
    }

    // delete a book
    public void deleteBook(int id) {
        Book book = bookDAO.getBookById(id);
        if (book.getAvailableCopies() < book.getTotalCopies()) {
            int borrowedCount = book.getTotalCopies() - book.getAvailableCopies();
            throw new IllegalStateException("Cannot delete book - " + borrowedCount + " copies are borrowed...");
        }
        bookDAO.deleteBook(id);
    }

    // check if book exists
    public boolean bookExists(String isbn) {
        try {
            bookDAO.getBookByIsbn(isbn);
            return true;
        } catch (BookNotFoundException e) {
            return false;
        }
    }

    // check available books
    public boolean isBookAvailable(String isbn) {
        try {
            Book book = bookDAO.getBookByIsbn(isbn);
            return book.getAvailableCopies() > 0;
        } catch (BookNotFoundException e) {
            return false;
        }
    }

    // get total number of books
    public int getTotalBooksCount() {
        return bookDAO.getTotalBookCount();
    }

    // get available number of books
    public int getAvailableBooksCount() {
        return bookDAO.getAvailableBooksCount();
    }

    public void validateBookInput(String title, String isbn, int totalCopies) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Book name cannot be empty!");
        }
        if (isbn != null && isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN cannot be empty!");
        }
        if (totalCopies < 1) {
            throw new IllegalArgumentException("Total copies must be at least 1!");
        }
    }


    // decrease count
    protected void decreaseAvailableCopies(int bookId) {
        bookDAO.decreaseAvailableCopies(bookId);
    }

    // increase count
    protected void increaseAvailableCopies(int bookId) {
        bookDAO.increaseAvailableCopies(bookId);
    }


}
