class Account {
    private final String accountNumber;
    private String accountHolder;
    private double balance;
    private static int accountCounter = 12900;

    public Account(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.accountNumber = this.generateAccountNumber();
        if (balance < 0) {
            throw new IllegalArgumentException("Initial balance can't be less than zero");
        }
        this.balance = balance;
    }

    private String generateAccountNumber() {
        String accountNumber = "Bank-" + this.accountCounter;
        return accountNumber;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid amount...");
        }
        this.balance += amount;
        System.out.println("Successfully deposited! " + amount);
        System.out.println("Current balance: " + this.balance);
    }

    public boolean withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be positive");
            return false;
        }
        if (amount > this.balance) {
            System.out.println("Insufficient balance! Available : " + this.balance);
        }
        this.balance -= amount;
        System.out.println("Successfully withdrew $" + (amount));
        System.out.println("Remaining Balance: $" + (this.balance));
        return true;

    }
    public void checkBalance(){
        System.out.println("Current balance : "+this.balance);
    }
}

public class Bank {
    public static void main(String args[]) {
        Account obj = new Account("User11", 100000);

    }
}
