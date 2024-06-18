package com.forestier.backend.dto.uml.operations;

import com.forestier.backend.dto.uml.TypeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MethodDto extends OperationDto {
    private boolean isAbstract;
    private boolean isStatic;

    private TypeDto returnType;
}
