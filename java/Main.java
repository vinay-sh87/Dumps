package com.app;

import java.util.*;

class Solutions {
    void takeInput() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter first number :");
        int first = sc.nextInt();
        System.out.println("Enter second number :");
        int second = sc.nextInt();
        System.out.println("Sum : " + (first + second));
        System.out.println("Sub : " + (first - second));
        System.out.println("Mul : " + (first * second));
        System.out.println("Remainder : " + (first % second));
        try {
            int division = first / second;
            System.out.println("Div : " + division);
        } catch (ArithmeticException e) {
            System.out.println("Division by zero is not possible..." + e.getMessage());
        }
    }
}

public class Main {
    public static void main(String args[]) {
        Solutions obj = new Solutions();
        obj.takeInput();
    }
}
