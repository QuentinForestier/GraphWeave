package com.forestier.backend.dto.uml.operations;

import com.forestier.backend.dto.uml.VisibilityDto;
import com.forestier.backend.dto.uml.variables.ParameterDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OperationDto {
    private String id;
    private String name;

    private VisibilityDto visibility;
    private List<ParameterDto> params;
}
