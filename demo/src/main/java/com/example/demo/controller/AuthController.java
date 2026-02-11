package com.example.demo.controller;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest registerRequest) {
        User user = userService.register(registerRequest);
        return toUserResponse(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @GetMapping("/me")
    public UserResponse me() {
        User user = userService.getCurrentUser();
        return toUserResponse(user);
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.isActive());
    }
}
