package org.example.controller;

import org.example.model.Product;
import org.example.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductsController {
    private final ProductService productService;

    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(201).body(createdProduct);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable long id) {
        Product product = productService.deleteProduct(id);
        return ResponseEntity.ok(product);
    }
}
