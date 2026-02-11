package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.exception.BookNotFoundException;
import org.example.exception.DuplicateIsbnException;
import org.example.model.Book;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookDAO {
    // add a book
    public void addBook(Book book) {
        String query = "INSERT INTO books (title, author, isbn, publisher, published_year, " +
                "total_copies, available_copies, category) VALUES (?,?,?,?,?,?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, book.getTitle());
            preparedStatement.setString(2, book.getAuthor());
            preparedStatement.setString(3, book.getIsbn());
            preparedStatement.setString(4, book.getPublisher());
            preparedStatement.setInt(5, book.getPublishedYear());
            preparedStatement.setInt(6, book.getTotalCopies());
            preparedStatement.setInt(7, book.getAvailableCopies());
            preparedStatement.setString(8, book.getCategory());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    book.setId(generatedKeys.getInt(1));
                }
                System.out.println("Book added successfully... ID: " + book.getId());
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                throw new DuplicateIsbnException("Book with isbn " + book.getIsbn());
            }
            throw new RuntimeException("Error adding book: " + e.getMessage());
        }
    }

    // get book by id
    public Book getBookById(int id) {
        String query = "SELECT * FROM books WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return extractBookFromResultSet(resultSet);
            } else {
                throw new BookNotFoundException("Book with " + id + " not found!");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // get book by isbn
    public Book getBookByIsbn(String isbn) {
        String query = "SELECT * FROM books WHERE isbn = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, isbn);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return extractBookFromResultSet(resultSet);
            } else {
                throw new BookNotFoundException("Book with ISBN : " + isbn + " not found...");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // get all the books
    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books ORDER BY title";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                books.add(extractBookFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving books..." + e.getMessage());
        }
        return books;
    }

    // search books by title
    public List<Book> searchBooksByTitle(String searchTerm) {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE title LIKE ? ORDER BY title";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, "%" + searchTerm + "%");
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                books.add(extractBookFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error searching books" + e.getMessage());
        }
        return books;
    }

    // search books by author
    public List<Book> searchBooksByAuthor(String searchTerm) {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE author LIKE ? ORDER BY author, title";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, "%" + searchTerm + "%");
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                books.add(extractBookFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error searching books..." + e.getMessage());
        }
        return books;
    }

    // get books by category
    public List<Book> getBooksByCategory(String category) {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE category = ? ORDER BY title";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, category);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                books.add(extractBookFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving books by category: " + e.getMessage());
        }
        return books;
    }

    // get available books
    public List<Book> getAvailableBooks() {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE available_copies > 0 ORDER BY title";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                books.add(extractBookFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving available books..." + e.getMessage());
        }
        return books;
    }

    // update book details
    public void updateBook(Book book) {
        String query = "UPDATE books SET title = ?, author = ?, publisher = ?, published_year = ?, total_copies = ?, " +
                "available_copies = ?, category = ? WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, book.getTitle());
            preparedStatement.setString(2, book.getAuthor());
            preparedStatement.setString(3, book.getPublisher());
            preparedStatement.setInt(4, book.getPublishedYear());
            preparedStatement.setInt(5, book.getTotalCopies());
            preparedStatement.setInt(6, book.getAvailableCopies());
            preparedStatement.setString(7, book.getCategory());
            preparedStatement.setInt(8, book.getId());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Book updated successfully...");
            } else {
                throw new BookNotFoundException("Book with id: " + book.getId() + " not found...");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating book..." + e.getMessage());
        }
    }

    // decrease available copies
    public void decreaseAvailableCopies(int bookId) {
        String query = "UPDATE books SET available_copies = available_copies - 1 WHERE id = ? AND available_copies > 0";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, bookId);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected == 0) {
                throw new RuntimeException("Cannot decrease copies - book not found or no copies available...");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error decreasing available copies: " + e.getMessage());
        }
    }

    // increase available copies
    public void increaseAvailableCopies(int bookId) {
        String query = "UPDATE books SET available_copies = available_copies + 1 WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, bookId);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected == 0) {
                throw new BookNotFoundException("Book with id: " + bookId + " not found!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error increasing book copies " + e.getMessage());
        }
    }

    // delete book
    public void deleteBook(int id) {
        String query = "DELETE FROM books WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Book deleted successfully....");
            } else {
                throw new BookNotFoundException("Book with id : " + id + " not found..");
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("foreign key constraints")) {
                throw new RuntimeException("Cannot delete book - it has borrow records!");
            }
            throw new RuntimeException("Error deleting book : " + e.getMessage());
        }
    }

    private Book extractBookFromResultSet(ResultSet resultSet) throws Exception {
        return new Book(
                resultSet.getInt("id"),
                resultSet.getString("title"),
                resultSet.getString("author"),
                resultSet.getString("isbn"),
                resultSet.getString("publisher"),
                resultSet.getInt("published_year"),
                resultSet.getInt("total_copies"),
                resultSet.getByte("available_copies"),
                resultSet.getString("category"),
                resultSet.getTimestamp("created_at").toLocalDateTime()
        );
    }

    // total books count
    public int getTotalBookCount() {
        String query = "SELECT COUNT(*) FROM books";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error counting books " + e.getMessage());
        }
        return 0;
    }

    // available books count
    public int getAvailableBooksCount() {
        String query = "SELECT COUNT(*) FROM books WHERE available_copies > 0";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
            resultSet.close();
        } catch (SQLException e) {
            throw new RuntimeException("Error counting available books..." + e.getMessage());
        }
        return 0;
    }
}















