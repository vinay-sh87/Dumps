package org.example.model;

import java.time.LocalDate;

public class Member {
    private int id;
    private String memberId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private LocalDate membershipDate;
    private String status;

    public Member(String memberId, String firstName, String lastName, String email, String phone, String address) {
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    // Constructor for Existing member
    public Member(int id, String memberId, String firstName, String lastName, String email, String phone, String address, LocalDate membershipDate
            , String status) {
        this.id = id;
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.membershipDate = membershipDate;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getMembershipDate() {
        return membershipDate;
    }

    public void setMembershipDate(LocalDate membershipDate) {
        this.membershipDate = membershipDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    @Override
    public String toString() {
        return String.format("Member{id=%d, memberId='%s', name='%s %s', email='%s', status='%s'}",
                id, memberId, firstName, lastName, email, status);
    }

}
