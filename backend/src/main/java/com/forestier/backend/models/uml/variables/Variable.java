package com.forestier.backend.models.uml.variables;

import com.forestier.backend.models.uml.types.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public abstract class Variable extends Value {

    private boolean isConstant;

    private Type type;
}
