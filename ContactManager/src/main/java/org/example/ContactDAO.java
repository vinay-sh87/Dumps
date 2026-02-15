package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ContactDAO {
    public boolean addContact(Contact contact) {
        String query = "insert into contacts (name,phone,email,address,category) values(?,?,?,?,?)";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, contact.getName());
            preparedStatement.setString(2, contact.getPhone());
            preparedStatement.setString(3, contact.getEmail());
            preparedStatement.setString(4, contact.getAddress());
            preparedStatement.setString(5, contact.getCategory());
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (Exception e) {
            System.out.println("Error adding contact");
            e.printStackTrace();
            return false;
        }
    }

    public List<Contact> getAllContacts() {
        List<Contact> contacts = new ArrayList<>();
        String query = "select * from contacts order by name asc";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query); ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String phone = resultSet.getString("phone");
                String email = resultSet.getString("email");
                String address = resultSet.getString("address");
                String category = resultSet.getString("category");
                String createdDate = resultSet.getString("created_date");

                Contact contact = new Contact(id, name, phone, email, address, category, createdDate);
                contacts.add(contact);
            }
        } catch (Exception e) {
            System.out.println("Error retrieving contacts");
            e.printStackTrace();
        }
        return contacts;
    }

    public List<Contact> searchContactsByName(String searchTerm) {
        List<Contact> contacts = new ArrayList<>();
        String query = "select * from contacts where name like ? order by name asc";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, "%" + searchTerm + "%");
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String phone = resultSet.getString("phone");
                String email = resultSet.getString("email");
                String address = resultSet.getString("address");
                String category = resultSet.getString("category");
                String createdDate = resultSet.getString("created_date");

                Contact contact = new Contact(id, name, phone, email, address, category, createdDate);
                contacts.add(contact);
            }
            resultSet.close();
        } catch (Exception e) {
            System.out.println("Error searching contact");
            e.printStackTrace();
        }
        return contacts;
    }

    public List<Contact> searchContactsByCategory(String category) {
        List<Contact> contacts = new ArrayList<>();
        String query = "select * from contacts where category = ? order by name asc";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, category);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String phone = resultSet.getString("phone");
                String email = resultSet.getString("email");
                String address = resultSet.getString("address");
                String cat = resultSet.getString("category");
                String createdDate = resultSet.getString("created_date");

                Contact contact = new Contact(id, name, phone, email, address, cat, createdDate);
                contacts.add(contact);
            }
            resultSet.close();
        } catch (Exception e) {
            System.out.println("Error getting contacts by category");
            e.printStackTrace();
        }
        return contacts;
    }

    public boolean updateContact(Contact contact) {
        String query = "update contacts set name=?, phone=?, email=?, address=?, category=? where id = ?";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, contact.getName());
            preparedStatement.setString(2, contact.getPhone());
            preparedStatement.setString(3, contact.getEmail());
            preparedStatement.setString(4, contact.getAddress());
            preparedStatement.setString(5, contact.getCategory());
            preparedStatement.setInt(6, contact.getId());
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (Exception e) {
            System.out.println("Error updating contact: ");
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteContact(int id) {
        String query = "delete from contacts where id = ?";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;
        } catch (Exception e) {
            System.out.println("Error deleting contact");
            e.printStackTrace();
            return false;
        }
    }

    public int getContactCount() {
        String query = "select count(*) from contacts";
        try (Connection connection = DatabaseConnection.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (Exception e) {
            System.out.println("Error getting total number of contacts");
            e.printStackTrace();
        }
        return 0;
    }

}
