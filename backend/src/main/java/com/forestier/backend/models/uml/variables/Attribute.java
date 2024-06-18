package com.forestier.backend.models.uml.variables;

import com.forestier.backend.models.uml.Visibility;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Attribute extends Variable {
    private boolean isStatic;
    private Visibility visibility;
}
