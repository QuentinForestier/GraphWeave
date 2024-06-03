package com.forestier.backend.dto.authentication;

import com.forestier.backend.dto.models.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private UserDto user;
    private String token;
}
