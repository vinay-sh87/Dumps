package com.example.project.service;

import com.example.project.dto.request.SignupRequest;
import com.example.project.model.User;
import com.example.project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void signup(SignupRequest signupRequest) {
        String email = signupRequest.email();
        boolean existingUser = userRepository.existsByEmail(email);
        if (existingUser) {
            throw new DuplicateKeyException(String.format("User with the email address '%s' already exists", email));
        }
        String hashedPassword = passwordEncoder.encode(signupRequest.password());
        User user = new User(signupRequest.name(), signupRequest.email(), hashedPassword);
            userRepository.save(user);
    }


}
