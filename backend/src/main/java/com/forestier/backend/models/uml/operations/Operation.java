package com.forestier.backend.models.uml.operations;

import com.forestier.backend.models.uml.Visibility;
import com.forestier.backend.models.uml.variables.Parameter;

import java.util.List;

public abstract class Operation {
    private String id;
    private String name;

    private List<Parameter> params;

    private Visibility visibility;
}
