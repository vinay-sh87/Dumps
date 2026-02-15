package org.example;

public class Contact {
    private int id;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String category;
    private String createdDate;

    public Contact(String name, String phone, String email, String address, String category) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.category = category;
    }

    public Contact(int id, String name, String phone, String email, String address, String category, String createdDate) {
        this.id = id;
        this.createdDate = createdDate;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.category = category;
        this.createdDate = createdDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", category='" + category + '\'' +
                '}';
    }

}
