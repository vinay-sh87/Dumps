package com.example;

abstract class PaymentMethod {
    protected String accountId;

    public PaymentMethod(String accountId) {
        this.accountId = accountId;
    }

    public abstract void processPayment(double amount);

    public void printReceipt(double amount) {
        System.out.println("-----Receipt----");
        System.out.println("Amount $" + amount);
        System.out.println("Account: " + accountId);
        System.out.println("--------------");
    }
}

class CreditCard extends PaymentMethod {
    final private String cardNumber;

    public CreditCard(String accountId, String cardNumber) {
        super(accountId);
        this.cardNumber = cardNumber;
    }

    public void processPayment(double amount) {
        System.out.println("Processing Payment via credit card");
        System.out.println("Card number : ****" + cardNumber.substring(12));
        System.out.println("Charged amount : " + amount);
        printReceipt(amount);
    }
}

class PayPal extends PaymentMethod {
    private String email;

    public PayPal(String accountId, String email) {
        super(accountId);
        this.email = email;
    }

    public void processPayment(double amount) {
        System.out.println("Payment initiated via paypal...");
        System.out.println("Email : " + email);
        System.out.println("Transferred : $" + amount);
        printReceipt(amount);
    }
}

class BankTransfer extends PaymentMethod {
    private final String bankName;

    public BankTransfer(String accountId, String bankName) {
        super(accountId);
        this.bankName = bankName;
    }

    public void processPayment(double amount) {
        System.out.println("Processing bank transfer...");
        System.out.println("Bank name : " + bankName);
        System.out.println("Transferred amount : $" + amount);
        printReceipt(amount);
    }
}

public class BankAbstraction {
    public static void main(String args[]) {
        PaymentMethod creditCard = new CreditCard("acceded39", "4524556565555");
        PaymentMethod payPal = new PayPal("dldfheh3434", "user43@gmail.com");
        PaymentMethod bankTransfer = new BankTransfer("falsifier34", "Axis Bank");
        creditCard.processPayment(45520.24);
        System.out.println();
        payPal.processPayment(7487855.656);
        System.out.println();
        bankTransfer.processPayment(2556666.55);

    }
}
