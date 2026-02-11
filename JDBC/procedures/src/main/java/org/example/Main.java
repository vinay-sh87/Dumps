package org.example;

import java.lang.reflect.Type;
import java.sql.*;

public class Main {
    // procedure without parameter
    public static void getAllEmployees() {
        try (Connection connection = DatabaseConfig.getConnection(); CallableStatement csbt = connection.prepareCall("{call getAllEmployees()}")) {
            ResultSet resultSet = csbt.executeQuery();
            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("employee_id"));
                System.out.println("Name: " + resultSet.getString("first_name") + " " + resultSet.getString("last_name"));
                System.out.println("Title: " + resultSet.getString("job_title"));
                System.out.println("Salary: $" + resultSet.getDouble("salary"));
                System.out.println("---");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // with in parameter
    public static void getEmployeesBySalaryRange(double min, double max) {
        try (Connection connection = DatabaseConfig.getConnection(); CallableStatement csbt = connection.prepareCall("{call getEmployeesBySalaryRange(?,?)}")) {
            csbt.setDouble(1, min);
            csbt.setDouble(2, max);
            ResultSet resultSet = csbt.executeQuery();

            System.out.println("Employees between salary range " + min + " and " + max);
            while (resultSet.next()) {
                System.out.println(resultSet.getString("first_name") + " " +
                        resultSet.getString("last_name") + ": $" +
                        resultSet.getDouble("salary"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // with out parameter
    public static void getDepartmentStats(int deptId) {
        try (Connection connection = DatabaseConfig.getConnection(); CallableStatement csbt = connection.prepareCall("{call getDepartmentStats(?,?,?,?)}")) {
            csbt.setInt(1, deptId);
            csbt.registerOutParameter(2, Types.INTEGER);
            csbt.registerOutParameter(3, Types.DECIMAL);
            csbt.registerOutParameter(4, Types.DECIMAL);
            csbt.execute();
            int count = csbt.getInt(2);
            double avgSalary = csbt.getDouble(3);
            double totalSalary = csbt.getDouble(4);

            System.out.println("Department Statistics : ");
            System.out.println("Employee count: " + count);
            System.out.println("Average salary: " + avgSalary);
            System.out.println("Total Salary: " + totalSalary);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        getAllEmployees();
        getEmployeesBySalaryRange(40000, 60000);
        getDepartmentStats(1);
    }
}