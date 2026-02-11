package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private Long nextId = 1L;

    // get all the products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // add a product
    public Product addProduct(Product product) {
        productRepository.save(product);
        return product;
    }

    // get product by id
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // update product
    public Product updateProduct(Long id, Product newProduct) {
        Product product = getProductById(id);
        if (product != null) {
            product.setName(newProduct.getName());
            product.setPrice(newProduct.getPrice());
            productRepository.save(product);
        }
        return null;
    }

    // delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
