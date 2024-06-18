package com.forestier.backend.models.uml.entities;

import com.forestier.backend.models.uml.variables.Value;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Enum extends ConstructableEntity{
    private List<Value> values;

    public Enum(String name) {
        super(name);
    }
}
