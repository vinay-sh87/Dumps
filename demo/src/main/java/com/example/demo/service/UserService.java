package com.example.demo.service;

import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole("USER");
        user.setActive(true);
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }


    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found..."));
        boolean isPasswordValid = bCryptPasswordEncoder.matches(password, user.getPassword());
        if (!isPasswordValid) {
            throw new RuntimeException("Invalid credentials...");
        }
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail());
    }

    public User getCurrentUser() {
        return userRepository.findAll().stream().findFirst().orElse(null);
    }
}
