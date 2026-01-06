// 10 ---> 1010
public class Main {
    public static void main(String args[]) {
        int number = 25;
        int one = 0;
        int zero = 0;
        // using built in methods
        int ones = Integer.bitCount(number);
        int totalBits = Integer.toBinaryString(number).length();
        System.out.println("Total bits : " + totalBits);
        System.out.println("Ones : " + ones);
        System.out.println("Zeros: " + (totalBits - ones));

        // using loop
        while (number > 0) {
            if (number % 2 == 0) {
                zero++;
            } else {
                one++;
            }
            number = number >> 1;
        }
        System.out.println("Ones : " + one + " Zeros: " + zero);

        // leading zeros
        int n = 24;
        int count = 0;
        for (int i = 31; i >= 0; i--) {
            if ((n & (1 << i)) == 0) {
                count++;
            } else {
                break;
            }
        }
        System.err.println("Leading zeros: " + count);
        for (int i = 0; i > -10; i++) {
            System.out.println("* " + i);
        }
    }
}
