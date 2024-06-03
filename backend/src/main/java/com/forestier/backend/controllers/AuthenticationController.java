package com.forestier.backend.controllers;

import com.forestier.backend.dto.authentication.LoginRequest;
import com.forestier.backend.dto.authentication.LoginResponse;
import com.forestier.backend.dto.authentication.SignupRequest;
import com.forestier.backend.dto.models.UserDto;
import com.forestier.backend.models.User;
import com.forestier.backend.services.AuthenticationService;
import com.forestier.backend.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/signup")
    public UserDto signup(@Valid @RequestBody SignupRequest dto) {
        return userService.convertToDto(authenticationService.signup(dto));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest dto) {
        return authenticationService.login(dto);
    }


}
