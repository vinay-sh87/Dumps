package org.example;

import javax.swing.*;

public class SimpleCalculator {
    public static void main(String args[]) {
        JFrame frame = new JFrame("Simple Calculator");
        frame.setSize(500, 400);
        JPanel panel = new JPanel();
        JLabel label1 = new JLabel("First Number: ");
        JTextField firstNumber = new JTextField(10);
        JLabel label2 = new JLabel("Second Number: ");
        JTextField secondNumber = new JTextField(10);
        JButton addBtn = new JButton("Add");
        JLabel resultLabel = new JLabel("Result: ");
        addBtn.addActionListener(e -> {
            try {
                int num1 = Integer.parseInt(firstNumber.getText());
                int num2 = Integer.parseInt(secondNumber.getText());
                int sum = num1 + num2;
                new Thread(() -> {
                    try {
                        resultLabel.setText("Sending request to nasa");
                        Thread.sleep(5000);
                        resultLabel.setText("Getting algorithms from nasa");
                        Thread.sleep(5000);
                        resultLabel.setText("Unable to solve by nasa");
                        Thread.sleep(5000);
                        resultLabel.setText("Contacting aliens to recognize your shittt");
                        Thread.sleep(5000);
                        resultLabel.setText("Finally your answer : " + sum);
                    } catch (Exception ex) {
                    }
                }).start();

            } catch (Exception exception) {
                JOptionPane.showMessageDialog(null, "Reason of error:-" + exception.getMessage());
            }
        });
        panel.add(label1);
        panel.add(firstNumber);
        panel.add(label2);
        panel.add(secondNumber);
        panel.add(addBtn);
        panel.add(resultLabel);

        frame.add(panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
