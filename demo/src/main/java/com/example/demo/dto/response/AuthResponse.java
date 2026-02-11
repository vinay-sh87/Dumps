package com.example.demo.dto.response;

public class AuthResponse {
    private String token;
    private String email;

    public AuthResponse(String token, String email) {
        this.token = token;
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    public String getToken() {
        return this.token;
    }

}
