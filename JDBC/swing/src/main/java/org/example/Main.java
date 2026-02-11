package org.example;

import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("First swing application...");
        frame.setSize(400, 300);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // container for components
        JPanel panel = new JPanel();
        panel.setBackground(Color.lightGray);
        frame.add(panel);

        // label
        JLabel label = new JLabel("Hello World");
        label.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 16));
        label.setForeground(Color.blue);
        panel.add(label);

        // button
        JButton button = new JButton("Click me");
        button.addActionListener(e->{
            System.out.println("Button clicked...");
        });
        panel.add(button);

        // text field
        JTextField textField = new JTextField(20);
        textField.setText("enter something");
        String text = textField.getText();
        panel.add(textField);
        textField.addActionListener(e->{
            System.out.println(e.getActionCommand());
        });

        // multiline text input
        JTextArea textArea = new JTextArea(5,20);
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        // scrollbar
        JScrollPane scrollPane = new JScrollPane(textArea);
        panel.add(scrollPane);

        // checkbox
        JCheckBox checkBox = new JCheckBox("Accept terms");
        checkBox.addActionListener(e->{
            boolean selected = checkBox.isSelected();
            System.out.println(selected);
        });
        panel.add(checkBox);

        // radio button
        JRadioButton option1 = new JRadioButton("Option 1");
        JRadioButton option2 = new JRadioButton("Option 2");
        ButtonGroup group = new ButtonGroup();
        group.add(option1);
        group.add(option2);
        panel.add(option1);
        panel.add(option2);

        // dropdown list
        String[] items = {"item1", "item2", "item3", "item4"};
        JComboBox<String> comboBox = new JComboBox<>(items);
        comboBox.addActionListener(e->{
            String selected = (String) comboBox.getSelectedItem();
            System.out.println(selected);
        });
        panel.add(comboBox);

        // scrollable list
        String[] data = {"apple","banana","cherry"};
        JList<String> list = new JList<>(data);
        list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        JScrollPane listScroller = new JScrollPane(list);
        panel.add(list);






        frame.setVisible(true);
    }
}