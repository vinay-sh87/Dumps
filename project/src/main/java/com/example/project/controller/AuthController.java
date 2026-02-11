package com.example.project.controller;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.request.SignupRequest;
import com.example.project.dto.response.LoginResponse;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest requestDto){
        userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        String token = JwtHelper.generateToken(request.email());
        return ResponseEntity.ok(new LoginResponse(request.email(), token));
    }
}
