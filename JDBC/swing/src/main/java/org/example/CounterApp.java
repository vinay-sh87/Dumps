package org.example;

import javax.swing.*;
import java.awt.*;

public class CounterApp {
    static int count = 0;

    public static void main(String args[]) {
        JFrame frame = new JFrame("Counter App");
        frame.setSize(400, 300);
        JPanel panel = new JPanel();
        JLabel label = new JLabel("0");
        JButton button = new JButton("decrease");
        JButton button1 = new JButton("set 0");
        JButton button2 = new JButton("increase");

        button.addActionListener(e -> {
            --count;
            label.setText(String.valueOf(count));
        });
        button1.addActionListener(e -> {
            count = 0;
            label.setText(String.valueOf(count));
        });
        button2.addActionListener(e -> {
            ++count;
            label.setText(String.valueOf(count));
        });
        panel.add(label);
        panel.add(button);
        panel.add(button1);
        panel.add(button2);
        panel.setLayout(new FlowLayout());

        frame.add(panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
