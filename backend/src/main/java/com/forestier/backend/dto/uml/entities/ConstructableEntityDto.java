package com.forestier.backend.dto.uml.entities;

import com.forestier.backend.dto.uml.operations.ConstructorDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ConstructableEntityDto extends EntityDto {
    private List<ConstructorDto> constructors;
}
