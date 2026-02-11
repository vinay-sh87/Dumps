package org.example;

import javax.swing.*;
import java.awt.*;

public class DropdownExample {
    public static void main(String args[]) {
        JFrame frame = new JFrame("Dropdown Example");
        frame.setSize(500, 400);
        JPanel panel = new JPanel();
        panel.setBackground(Color.lightGray);
        JLabel label = new JLabel("Choose your favorite: ");
        label.setFont(new Font("Arial", Font.BOLD, 24));
        label.setForeground(Color.DARK_GRAY); // label color
        String[] options = {"Pizza", "Burger", "Pasta", "Salad"};
        JComboBox<String> jComboBox = new JComboBox<>(options);
        JButton button = new JButton("Select");
        button.setBackground(Color.ORANGE); // button color
        button.setFont(new Font("Arial", Font.PLAIN, 16));

        JLabel resultLabel = new JLabel("");
        button.addActionListener(e -> {
            String selected = (String) jComboBox.getSelectedItem();
            resultLabel.setText("You choose: " + selected);
        });
        panel.add(label);
        panel.add(jComboBox);
        panel.add(button);
        panel.add(resultLabel);


        frame.add(panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
