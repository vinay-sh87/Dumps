package org.example;

import javax.swing.*;
import java.awt.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class EmployeeDropdown {
    private JComboBox<Integer> comboBox;
    private JTextField nameField, salaryField;

    public EmployeeDropdown() {
        JFrame frame = new JFrame("Employee info");
        frame.setSize(400, 300);
        frame.setLayout(new GridLayout(3, 2, 5, 5));
        comboBox = new JComboBox<>();
        nameField = new JTextField();
        salaryField = new JTextField();

        nameField.setEditable(false);
        salaryField.setEditable(false);

        frame.add(new JLabel("Select Code: "));
        frame.add(comboBox);

        frame.add(new JLabel("Name: "));
        frame.add(nameField);

        frame.add(new JLabel("Salary: "));
        frame.add(salaryField);

        loadCodes();
        comboBox.addActionListener(e -> fetchEmployee());

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

    private void loadCodes() {
        String query = "select code from employee";
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                comboBox.addItem(resultSet.getInt(1));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void fetchEmployee() {
        Integer code = (Integer) comboBox.getSelectedItem();
        try (Connection connection = DatabaseConfig.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement("select * from employee where code = ?")) {
            preparedStatement.setInt(1, code);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                nameField.setText(resultSet.getString("name"));
                salaryField.setText(resultSet.getString("salary"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String args[]) {
        EmployeeDropdown obj = new EmployeeDropdown();
    }
}
