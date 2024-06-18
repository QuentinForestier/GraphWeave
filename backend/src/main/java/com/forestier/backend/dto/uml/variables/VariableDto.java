package com.forestier.backend.dto.uml.variables;

import com.forestier.backend.dto.uml.TypeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VariableDto extends ValueDto {

    private boolean isConstant;
    private TypeDto type;
}
