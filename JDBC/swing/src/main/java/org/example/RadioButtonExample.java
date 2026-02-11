package org.example;

import javax.swing.*;
import java.awt.*;

public class RadioButtonExample {
    public static void main(String args[]) {
        JFrame frame = new JFrame("Radio Buttons");
        frame.setSize(500, 400);
        JPanel panel = new JPanel();
        JLabel label = new JLabel("Choose size");
        JRadioButton small = new JRadioButton("Small");
        JRadioButton medium = new JRadioButton("Medium");
        JRadioButton large = new JRadioButton("Large");
        ButtonGroup group = new ButtonGroup();
        group.add(small);
        group.add(medium);
        group.add(large);
        JButton button = new JButton("Order");
        JLabel resultLabel = new JLabel("");

        button.addActionListener(e -> {
            String size = "";
            if (small.isSelected()) size = "Small";
            if (medium.isSelected()) size = "Medium";
            if (large.isSelected()) size = "Large";
            resultLabel.setText("You ordered : " + size);
        });
        panel.add(label);
        panel.add(small);
        panel.add(medium);
        panel.add(large);
        panel.add(button);
        panel.add(resultLabel);

        frame.add(panel);

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
