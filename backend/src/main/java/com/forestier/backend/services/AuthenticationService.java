package com.forestier.backend.services;

import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.dto.authentication.LoginRequest;
import com.forestier.backend.dto.authentication.SignupRequest;
import com.forestier.backend.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthenticationService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public User signup(SignupRequest dto) {
        if(!Objects.equals(dto.getPassword(), dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        if(userService.userExists(dto.getEmail())) {
            throw new IllegalArgumentException("User with email already exists");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setUsername(dto.getUsername());


        return userService.saveUser(user);
    }

    public String login(LoginRequest dto) {
        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        if(auth.isAuthenticated()) {
            return JwtHelper.generateToken(userService.convertToDto(userService.getUserByEmail(dto.getEmail())));
        }
        throw new IllegalArgumentException("Invalid credentials");
    }
}
