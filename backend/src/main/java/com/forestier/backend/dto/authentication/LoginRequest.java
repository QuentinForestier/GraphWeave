package com.forestier.backend.dto.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

}
