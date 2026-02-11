package com.example;

class Dish{
    String name;
    double price;
    String category;
    int quantity;
    public Dish(String name, double price, String category, int quantity){
        this.name = name;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
    }
    public void getInfo(){
        System.out.println(name + " price $"+this.price + " category ("+this.category+")");
    }
    public void orderItem(int quantity){
        if(quantity > this.quantity){
            System.out.println("item is out of stock...");
        }else{
            System.out.println("Order placed successfully...");
            this.quantity -= quantity;
        }
    }
}
public class RestaurantMenu {
    public static void main(String  args[]){
        Dish obj = new Dish("pasta",20,"italian",10);
        obj.getInfo();
        obj.orderItem(2);
    }
}
