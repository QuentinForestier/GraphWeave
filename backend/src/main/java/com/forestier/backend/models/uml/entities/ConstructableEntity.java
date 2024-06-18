package com.forestier.backend.models.uml.entities;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.forestier.backend.models.uml.operations.Constructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@JsonSubTypes({
        @JsonSubTypes.Type(value = Enum.class, name = "Enum"),
        @JsonSubTypes.Type(value = Class.class, name = "Class"),
})
public abstract class ConstructableEntity extends Entity{
    private List<Constructor> constructors;

    public ConstructableEntity(String name) {
        super(name);
    }
}
