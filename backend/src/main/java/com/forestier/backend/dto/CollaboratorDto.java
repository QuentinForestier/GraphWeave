package com.forestier.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollaboratorDto {
    private UserDto user;
    private boolean isOwner;
    private boolean canEdit;
}
