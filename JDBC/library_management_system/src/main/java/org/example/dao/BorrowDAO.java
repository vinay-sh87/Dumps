package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.model.BorrowRecord;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BorrowDAO {

    // borrow a book
    public void borrowBook(BorrowRecord record) {
        String query = "INSERT INTO borrowed_books (book_id, member_id, borrow_date, due_date, status) " +
                "VALUES (?,?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, record.getBookId());
            preparedStatement.setInt(2, record.getMemberId());
            preparedStatement.setDate(3, Date.valueOf(record.getBorrowDate()));
            preparedStatement.setDate(4, Date.valueOf(record.getDueDate()));
            preparedStatement.setString(5, record.getStatus());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    record.setId(generatedKeys.getInt(1));
                }
                System.out.println("Book borrow successfully");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error borrowing book: " + e.getMessage());
        }
    }

    // return a book
    public void returnBook(int borrowId, LocalDate returnDate, double lateFee) {
        String query = "UPDATE borrowed_books SET return_date = ?, late_fee = ?, status = 'returned' WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setDate(1, Date.valueOf(returnDate));
            preparedStatement.setDouble(2, lateFee);
            preparedStatement.setInt(3, borrowId);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Book returned successfully");
                if (lateFee > 0) {
                    System.out.println("Late fee : " + lateFee);
                }
            } else {
                throw new RuntimeException("Borrow record not found...");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error returning book: " + e.getMessage());
        }
    }

    // get borrow record by id
    public BorrowRecord getBorrowRecordById(int id) {
        String query = "SELECT bb.*, b.title as book_title, " +
                "CONCAT(m.first_name, ' ', m.last_name) as member_name " +
                "FROM borrowed_books as bb" +
                "JOIN books b ON bb.book_id = b.id" +
                "JOIN members m ON bb.member_id = m.id" +
                "WHERE bb.id = ?";

        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return extractBorrowRecordFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving borrow record...");
        }
        return null;
    }

    // get all currently borrowed books
    public List<BorrowRecord> getCurrentlyBorrowedBooks() {
        List<BorrowRecord> records = new ArrayList<>();
        String query = "SELECT bb.*, b.title as book_title " +
                "CONCAT(m.first_name,' ',m.last_name) as member_name " +
                "FROM borrowed_books bb " +
                "JOIN books b ON bb.book_id = b.id " +
                "JOIN members m ON bb.member_id = m.id " +
                "WHERE bb.status = 'borrowed' " +
                "ORDER BY bb.due_date";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                records.add(extractBorrowRecordFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving borrowed books : " + e.getMessage());
        }
        return records;
    }

    // get books borrowed by specific member
    public List<BorrowRecord> getBorrowedBooksByMember(int memberId) {
        List<BorrowRecord> records = new ArrayList<>();
        String query = """
                SELECT bb.*, b.title as book_title,
                CONCAT(m.first_name, ' ',m.last_name) as member_name
                FROM borrowed_books bb
                JOIN books b ON bb.book_id = b.id
                JOIN members m ON bb.member_id = m.id
                WHERE bb.member_id = ?
                ORDER BY bb.borrow_date DESC
                """;
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, memberId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                records.add(extractBorrowRecordFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving member's borrowed books..." + e.getMessage());
        }
        return records;
    }

    // get currently borrowed books by specific member
    public List<BorrowRecord> getCurrentBorrowsByMember(int memberId) {
        List<BorrowRecord> records = new ArrayList<>();
        String query = """
                SELECT bb.*, b.title as book_title,
                CONCAT(m.first_name, ' ', m.last_name) as member_name
                FROM borrowed_books bb
                JOIN books b ON bb.book_id = b.id
                JOIN members m ON bb.member_id = m.id
                WHERE bb.member_id = ? AND bb.status = 'borrowed'
                ORDER BY bb.due_date
                """;
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, memberId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                records.add(extractBorrowRecordFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving members current borrows: " + e.getMessage());
        }
        return records;
    }

    // get overdue books
    public List<BorrowRecord> getOverdueBooks() {
        List<BorrowRecord> records = new ArrayList<>();
        String query = """
                SELECT bb.*, b.title as book_title,
                CONCAT(m.first_name, ' ', m.last_name) as member_name
                FROM borrowed_books as bb
                JOIN books b ON bb.book_id = b.id
                JOIN members m ON bb.member_id = m.id
                WHERE bb.status = 'borrowed' AND bb.due_date < CURDATE()
                ORDER BY bb.due_date
                """;
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                BorrowRecord record = extractBorrowRecordFromResultSet(resultSet);
                record.setStatus("overdue");
                records.add(record);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving overdue books...");
        }
        return records;
    }

    // get borrow history for a book
    public List<BorrowRecord> getBorrowHistoryByBook(int bookId) {
        List<BorrowRecord> records = new ArrayList<>();
        String query = """
                SELECT bb.*, b.title as book_title,
                CONCAT(m.first_name, ' ', m.last_name) as member_name
                FROM borrowed_books as bb
                JOIN books b ON bb.book_id = b.id
                JOIN members m ON bb.member_id = m.id
                WHERE bb.id = ?
                ORDER BY bb.borrow_date DESC
                """;
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, bookId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                records.add(extractBorrowRecordFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving book borrow history: " + e.getMessage());
        }
        return records;
    }

    // update overdue status
    public void updateOverdueStatus() {
        String query = "UPDATE borrowed_books SET status = 'overdue' " +
                "WHERE status = 'borrowed' AND due_date < CURDATE()";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Updated overdue status: " + rowsAffected + " books to overdue status");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error updating overdue status: " + e.getMessage());
        }
    }

    // get total borrows count
    public int getTotalBorrowsCount() {
        String query = "SELECT COUNT(*) FROM borrowed_books";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error counting borrows : " + e.getMessage());
        }
        return 0;
    }

    // get currently borrowed count
    public int getCurrentlyBorrowedCount() {
        String query = "SELECT COUNT(*) FROM borrowed_books WHERE status = 'borrowed'";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error counting borrows: " + e.getMessage());
        }
        return 0;
    }

    // get total late fee collected
    public double getTotalLateFees() {
        String query = "SELECT SUM(late_fee) FROM borrowed_books WHERE late_fee > 0";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getDouble(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error calculating fees: " + e.getMessage());
        }
        return 0;
    }

    // maps borrow record to java object
    private BorrowRecord extractBorrowRecordFromResultSet(ResultSet resultSet) throws SQLException {
        BorrowRecord record = new BorrowRecord(
                resultSet.getInt("id"),
                resultSet.getInt("book_id"),
                resultSet.getInt("member_id"),
                resultSet.getDate("borrow_date").toLocalDate(),
                resultSet.getDate("due_date").toLocalDate(),
                resultSet.getDate("return_date") != null ? resultSet.getDate("return_date").toLocalDate() : null,
                resultSet.getDouble("late_fee"),
                resultSet.getString("status")
        );
        record.setBookTitle(resultSet.getString("book_title"));
        record.setMemberName(resultSet.getString("member_name"));
        return record;
    }
}













