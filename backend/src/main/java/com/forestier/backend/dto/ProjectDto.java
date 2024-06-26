package com.forestier.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProjectDto {

        private UUID id;

        @NotBlank(message = "Name is mandatory")
        @Size(min = 2, max = 20, message = "Project name must be between 2 and 50 characters")
        private String name;

        private List<CollaboratorDto> collaborators;
}
