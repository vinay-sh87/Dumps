package com.example;

import java.util.ArrayList;

class MenuItem {
    String name;
    double price;
    int stock;

    public MenuItem(String name, double price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

class OrderItem {
    MenuItem item;
    int quantity;

    public OrderItem(MenuItem item, int quantity) {
        this.item = item;
        this.quantity = quantity;
    }
}

class Order {
    ArrayList<OrderItem> items = new ArrayList<>();

    public Order() {
    }

    public void addItem(MenuItem item, int quantity) {
        if (quantity > item.stock) {
            System.out.println("item is out of stock...");
            return;
        }
        item.stock -= quantity;
        items.add(new OrderItem(item, quantity));
        System.out.println(item.name + " added to order...");
    }

    public double calculateTotal() {
        double total = 0;
        for (OrderItem orderItem : items) {
            total += orderItem.item.price * orderItem.quantity;
        }
        return total;
    }

    public void displayOrder() {
        System.out.println("Your order");
        for (OrderItem orderItem : items) {
            System.out.println(orderItem.item.name + " -$" + orderItem.item.price);
        }
        System.out.println("Total : " + this.calculateTotal());
    }
}

public class RestaurantBackend {
    public static void main(String args[]) {
        MenuItem pizza = new MenuItem("Pizza", 12.99, 10);
        MenuItem burger = new MenuItem("Burger", 8.99, 20);
        MenuItem salad = new MenuItem("Salad", 6.99, 20);

        Order newOrder = new Order();
        newOrder.addItem(pizza, 20);
        newOrder.addItem(burger, 19);
        newOrder.displayOrder();
    }
}
