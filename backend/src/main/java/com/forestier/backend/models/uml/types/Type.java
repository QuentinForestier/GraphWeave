package com.forestier.backend.models.uml.types;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonValue;
import com.forestier.backend.models.uml.entities.Entity;
import lombok.*;

@NoArgsConstructor
@JsonSubTypes({
        @JsonSubTypes.Type(value = SimpleType.class, name = "SimpleType"),
        @JsonSubTypes.Type(value = PrimitiveType.class, name = "PrimitiveType"),
        @JsonSubTypes.Type(value = Entity.class, name = "Entity"),
})
@Getter
@Setter
public abstract class Type {
    private String name;

    public Type(String name) {
        this.name = name;
    }

}
