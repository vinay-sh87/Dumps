package org.example.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Product {
    private long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int quantity;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Product() {
    }

    public Product(long id, String name, String description, BigDecimal price, int quantity, boolean isActive, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public boolean isActive() {
        return this.isActive;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }
}
