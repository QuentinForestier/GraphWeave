package com.forestier.backend.models.uml.entities;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.forestier.backend.models.uml.Visibility;
import com.forestier.backend.models.uml.operations.Method;
import com.forestier.backend.models.uml.variables.Attribute;
import com.forestier.backend.models.uml.graphics.GraphicalNode;
import com.forestier.backend.models.uml.types.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@JsonSubTypes({
        @JsonSubTypes.Type(value = ConstructableEntity.class, name = "ConstructableEntity"),
        @JsonSubTypes.Type(value = Interface.class, name = "Interface"),

})
public abstract class Entity extends Type {
    private String id;
    private Visibility visibility;

    private List<Attribute> attributes;
    private List<Method> methods;

    private GraphicalNode graphics;

    public Entity(String name) {
        super(name);
    }
}
