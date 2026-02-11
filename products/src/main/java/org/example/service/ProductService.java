package org.example.service;

import org.example.dao.ProductDAO;
import org.example.model.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {
    private final ProductDAO productDAO;

    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    // create product
    public Product createProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("product cannot be null");
        }
        if (product.getName() == null || product.getName().trim().isBlank()) {
            throw new IllegalArgumentException("product name is required");
        }
        if (product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("price must be greater than zero");
        }
        if (product.getQuantity() < 0) {
            throw new IllegalArgumentException("quantity cannot be negative");
        }
        return productDAO.createProduct(product);
    }

    // get product by id
    public Product getProductById(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid product id");
        }
        return productDAO.getProductById(id).orElseThrow(() -> new RuntimeException("No product found with the provided id"));
    }

    // update product
    public Product updateProduct(long id, Product updatedProduct) {
        Product product = getProductById(id);

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setActive(updatedProduct.isActive());
        productDAO.updateProduct(product);
        return product;
    }

    // get all products
    public List<Product> getAllProducts() {
        return productDAO.getAllProducts();
    }

    // delete product
    public Product deleteProduct(long id) {
        Product exists = getProductById(id);
        if (!exists.isActive()) {
            throw new RuntimeException("product is already deleted/inactive");
        }
        productDAO.deleteProduct(id);
        return exists;
    }
}
