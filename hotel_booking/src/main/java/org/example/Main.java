package org.example;


import org.example.dao.RoomDAO;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) throws Exception {

        RoomDAO roomDAO = new RoomDAO();
        System.out.println(roomDAO.findAvailableRooms(LocalDate.of(2026, 2, 1), LocalDate.of(2026, 2, 6)));
    }
}