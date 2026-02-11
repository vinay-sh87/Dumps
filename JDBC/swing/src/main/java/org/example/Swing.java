package org.example;

import javax.swing.*;

public class Swing {
    public static void main(String args[]) {
        JFrame window = new JFrame();
        window.setTitle("Window title");
        window.setSize(500, 400);
        JPanel panel = new JPanel();

        JButton button = new JButton("Click here");
        button.addActionListener(e -> {
            System.out.println("Button was clicked...");
        });
        panel.add(button);

        JLabel label = new JLabel("Label text");
        panel.add(label);

        JLabel label1 = new JLabel("Enter your name: ");
        JLabel label2 = new JLabel();
        JTextField textField = new JTextField(20);
        JButton button1 = new JButton("Submit");
        button1.addActionListener(e -> {
            String name = textField.getText();
            System.out.println("You entered : " + name);
            label2.setText(name);
        });
        panel.add(label1);
        panel.add(textField);
        panel.add(button1);
        panel.add(label2);

        // checkbox
        JCheckBox checkBox = new JCheckBox("I agree to terms");
        JButton button2 = new JButton("Submit");
        JLabel label3 = new JLabel("");
        button2.addActionListener(e -> {
            if (checkBox.isSelected()) {
                label3.setText("Thank you for agreeing!");
            } else {
                label3.setText("You must agree to continue...");
            }
        });
        panel.add(checkBox);
        panel.add(button2);
        panel.add(label3);

        window.add(panel);
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        window.setVisible(true);
    }
}
