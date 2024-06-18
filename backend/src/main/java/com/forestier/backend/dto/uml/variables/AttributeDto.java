package com.forestier.backend.dto.uml.variables;

import com.forestier.backend.dto.uml.VisibilityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeDto extends VariableDto{
    private boolean isStatic;
    private VisibilityDto visibility;
}
