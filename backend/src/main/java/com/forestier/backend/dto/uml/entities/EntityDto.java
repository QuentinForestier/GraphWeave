package com.forestier.backend.dto.uml.entities;

import com.forestier.backend.dto.uml.TypeDto;
import com.forestier.backend.dto.uml.VisibilityDto;
import com.forestier.backend.dto.uml.graphics.GraphicalNodeDto;
import com.forestier.backend.models.uml.operations.Method;
import com.forestier.backend.models.uml.variables.Attribute;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EntityDto extends TypeDto {
    private String id;
    private VisibilityDto visibility;

    private List<Attribute> attributes;
    private List<Method> methods;

    private GraphicalNodeDto graphics;

}
