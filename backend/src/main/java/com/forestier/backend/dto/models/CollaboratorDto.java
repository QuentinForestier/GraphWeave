package com.forestier.backend.dto.models;

import com.forestier.backend.models.CollaboratorId;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CollaboratorDto{
        @NotNull(message = "Project id is mandatory")
        private UUID projectId;

        @NotNull(message = "User id is mandatory")
        private UUID userId;

        private Boolean isOwner;

        private Boolean canWrite;
}
