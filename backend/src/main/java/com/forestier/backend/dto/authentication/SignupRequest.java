package com.forestier.backend.dto.authentication;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        private String email;

        @NotBlank(message = "Username is required")
        @Size(min = 2, max = 20, message = "Username must be between 2 and 20 characters")
        private String username;

        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" ,
                message = "Password must be 8 characters, at least one digit, one lowercase, one uppercase, one special character")
        private String password;

        @NotBlank(message = "Password confirmation is required")
        private String confirmPassword;
}
