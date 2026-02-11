package org.example.dao;

import org.example.config.DatabaseConfig;
import org.example.exception.MemberNotFoundException;
import org.example.model.Member;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {
    // add new member
    public void addMember(Member member) {
        String query = "INSERT INTO members (member_id, first_name, last_name, email, phone, address, status, " +
                "VALUES (?,?,?,?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query,
                Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, member.getMemberId());
            preparedStatement.setString(2, member.getFirstName());
            preparedStatement.setString(3, member.getLastName());
            preparedStatement.setString(4, member.getEmail());
            preparedStatement.setString(5, member.getPhone());
            preparedStatement.setString(6, member.getAddress());
            preparedStatement.setString(7, member.getStatus());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    member.setId(generatedKeys.getInt(1));
                }
                System.out.println("Member added successfully...");
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                System.out.println("Member with the id or email already exists...");
            }
            throw new RuntimeException("Error adding member " + e.getMessage());
        }
    }

    // get member by database id
    public Member getMemberById(int id) {
        String query = "SELECT * FROM members WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return extractMemberFromResultSet(resultSet);
            } else {
                throw new MemberNotFoundException("Member with the id " + id + " not found!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving member: " + e.getMessage());
        }
    }

    // get member by member id
    public Member getMemberByMemberId(String memberId) {
        String query = "SELECT * FROM members WHERE member_id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, memberId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return extractMemberFromResultSet(resultSet);
            } else {
                throw new MemberNotFoundException("Member with the id " + memberId + " not found...");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving member" + e.getMessage());
        }
    }

    // read all the members
    public List<Member> getAllMembers() {
        List<Member> members = new ArrayList<>();
        String query = "SELECT * FROM members ORDER BY first_name, last_name";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                members.add(extractMemberFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving members " + e.getMessage());
        }
        return members;
    }

    // search members by name
    public List<Member> searchMembersByName(String searchTerm) {
        List<Member> members = new ArrayList<>();
        String query = "SELECT * FROM members WHERE first_name LIKE ? OR last_name LIKE ? ORDER BY first_name, last_name";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, "%" + searchTerm + "%");
            preparedStatement.setString(2, "%" + searchTerm + "%");
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                members.add(extractMemberFromResultSet(resultSet));
            }

        } catch (Exception e) {
            throw new RuntimeException("Error searching members..." + e.getMessage());
        }
        return members;
    }

    // get members by status
    public List<Member> getMembersByStatus(String status) {
        List<Member> members = new ArrayList<>();
        String query = "SELECT * FROM members WHERE status = ? ORDER BY first_name, last_name";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, status);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                members.add(extractMemberFromResultSet(resultSet));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving members by status..." + e.getMessage());
        }
        return members;
    }

    // update member details
    public void updateMemberDetails(Member member) {
        String query = "UPDATE members SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, status = ?" +
                " WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, member.getFirstName());
            preparedStatement.setString(2, member.getLastName());
            preparedStatement.setString(3, member.getEmail());
            preparedStatement.setString(4, member.getPhone());
            preparedStatement.setString(5, member.getAddress());
            preparedStatement.setString(6, member.getStatus());
            preparedStatement.setInt(7, member.getId());

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Member updated successfully...");
            } else {
                throw new MemberNotFoundException("Member with id " + member.getId() + " not found!");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error updating member: " + e.getMessage());
        }
    }

    // change member status
    public void updateMemberStatus(int memberId, String status) {
        String query = "UPDATE members SET status = ? WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, status);
            preparedStatement.setInt(2, memberId);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Member status updated to : " + status);
            } else {
                throw new MemberNotFoundException("Member with id : " + memberId + " not found... ");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error updating member status " + e.getMessage());
        }
    }

    // delete member
    public void deleteMember(int id) {
        String query = "DELETE FROM members WHERE id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Member deleted successfully...");
            } else {
                throw new MemberNotFoundException("Member with id: " + id + " not found!");
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("foreign key constraint")) {
                throw new RuntimeException("Cannot delete member - they have borrow records");
            } else {
                throw new RuntimeException("Error deleting member" + e.getMessage());
            }
        }
    }

    // get total members
    public int getTotalMembersCount() {
        String query = "SELECT COUNT(*) FROM members";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            System.out.println("Error counting members: " + e.getMessage());
        }
        return 0;
    }

    // get active members count
    public int getActiveMembersCount() {
        String query = "SELECT COUNT(*) FROM members WHERE status = 'active'";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving active members");
        }
        return 0;
    }

    public Member extractMemberFromResultSet(ResultSet resultSet) throws Exception {
        return new Member(
                resultSet.getInt("id"),
                resultSet.getString("member_id"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("email"),
                resultSet.getString("phone"),
                resultSet.getString("address"),
                resultSet.getDate("membership_date").toLocalDate(),
                resultSet.getString("status")
        );

    }

    public String generateNextMemberId() {
        String query = "SELECT member_id FROM members ORDER BY id DESC LIMIT 1";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            if (rs.next()) {
                String lastId = rs.getString("member_id");
                int number = Integer.parseInt(lastId.substring(3));
                return String.format("MEM%03d", number + 1);
            } else {
                return "MEM001"; // First member
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error generating member ID: " + e.getMessage(), e);
        }
    }
}



















