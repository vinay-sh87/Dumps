package org.example.model;

import java.time.LocalDate;
import java.util.Date;

public class Booking {
    private int id;
    private int guestId;
    private int roomId;
    private LocalDate checkIn;
    private LocalDate checkout;
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGuestId() {
        return this.guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }

    public int getRoomId() {
        return this.roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public LocalDate getCheckIn() {
        return this.checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckout() {
        return this.checkout;
    }

    public void setCheckout(LocalDate checkout) {
        this.checkout = checkout;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
