package com.forestier.backend.dto.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserDto{
        @NotNull(message = "User id is mandatory")
        private UUID id;

        @NotBlank(message = "Name is mandatory")
        @Size(min = 2, max = 30, message = "User name must be between 2 and 30 characters")
        private String username;

        @NotBlank(message = "Email is mandatory")
        @Email(message = "Email is not valid")
        private String email;
}
