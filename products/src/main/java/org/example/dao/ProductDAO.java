package org.example.dao;

import org.example.DatabaseConfig;
import org.example.model.Product;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
createProduct(Product product) → insert into DB & fetch generated ID
getProductById(long id) → map ResultSet → Product
updateProduct(Product product) → update fields
deactivateProduct(long id) → soft delete (isActive = false)
getAllProducts() → return List<Product>
 */
@Repository
public class ProductDAO {
    // create product
    public Product createProduct(Product product) {
        String query = "insert into products(name,description,price,quantity,is_active) values(?,?,?,?,?)";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, product.getName());
            preparedStatement.setString(2, product.getDescription());
            preparedStatement.setBigDecimal(3, product.getPrice());
            preparedStatement.setInt(4, product.getQuantity());
            preparedStatement.setBoolean(5, product.isActive());

            preparedStatement.executeUpdate();
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                product.setId(resultSet.getLong(1));
            } else {
                throw new SQLException("Creating product failed...");
            }
            return product;
        } catch (SQLException e) {
            throw new RuntimeException("Error creating product " + e);
        }
    }

    // get all products
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        String query = "select * from products";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
            return products;
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving products" + e);
        }
    }

    // get product by id
    public Optional<Product> getProductById(long id) {
        String query = "select * from products where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setLong(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return Optional.of(extractProductFromResultSet(resultSet));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Failed to retrieve product by id...");
        }
    }

    // update product
    public boolean updateProduct(Product product) {
        String query = "update products set name = ?, description = ?, price = ?, quantity = ?, is_active = ?, updated_at = now() where id = ?";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, product.getName());
            preparedStatement.setString(2, product.getDescription());
            preparedStatement.setBigDecimal(3, product.getPrice());
            preparedStatement.setInt(4, product.getQuantity());
            preparedStatement.setBoolean(5, product.isActive());
            preparedStatement.setLong(6, product.getId());

            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException("Error updating product" + e);
        }
    }

    // delete product
    public boolean deleteProduct(long id) {
        String query = "update products set is_active = false where id =? ";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setLong(1, id);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting product " + e);
        }
    }

    private Product extractProductFromResultSet(ResultSet resultSet) throws SQLException {
        Timestamp createdTs = resultSet.getTimestamp("created_at");
        Timestamp updatedTs = resultSet.getTimestamp("updated_at");
        return new Product(
                resultSet.getLong("id"),
                resultSet.getString("name"),
                resultSet.getString("description"),
                resultSet.getBigDecimal("price"),
                resultSet.getInt("quantity"),
                resultSet.getBoolean("is_active"),
                createdTs != null ? createdTs.toLocalDateTime() : null,
                updatedTs != null ? updatedTs.toLocalDateTime() : null
        );
    }
}
