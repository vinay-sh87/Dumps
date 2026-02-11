package org.example;

import javax.swing.*;

public class Table {
    public static void main(String args[]) {
        JFrame frame = new JFrame("Tables");
        frame.setSize(400,300);
        String[] cols = {"ID", "Name", "Salary"};
        String[][] data = {
                {"1", "user 1", "30000"},
                {"2", "user 2", "40000"},
                {"3", "user 3", "50000"}
        };
        JTable table = new JTable(data, cols);
        JScrollPane scrollPane = new JScrollPane(table);
        frame.add(scrollPane);
        frame.setLayout(null);   // disable layout manager

        scrollPane.setBounds(50, 50, 300, 150); // x, y, width, height
        frame.add(scrollPane);

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
