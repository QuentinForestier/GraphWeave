package com.forestier.backend.models.uml.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Class extends ConstructableEntity implements Implementor {
    private boolean isAbstract;

    public Class(String name) {
        super(name);
    }
}
