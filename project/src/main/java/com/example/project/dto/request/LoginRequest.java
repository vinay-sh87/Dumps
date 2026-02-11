package com.example.project.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @Email(message = "Invalid email format")
        @NotBlank(message = "email connot be blank")
        String email,
        @NotBlank(message = "Password cannot be blank")
        @Size(min = 6, max = 20, message = "Password should be between 6 and 20 characters")
        String password
) {
}
