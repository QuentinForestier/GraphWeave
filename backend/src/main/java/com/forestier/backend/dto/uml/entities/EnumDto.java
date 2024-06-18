package com.forestier.backend.dto.uml.entities;

import com.forestier.backend.dto.uml.variables.ValueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EnumDto extends ConstructableEntityDto{
    private List<ValueDto> values;
}
