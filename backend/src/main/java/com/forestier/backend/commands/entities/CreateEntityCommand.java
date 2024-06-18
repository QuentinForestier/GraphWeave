package com.forestier.backend.commands.entities;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.uml.entities.Entity;

public class CreateEntityCommand<T extends Entity> extends EntityCommand<T> {


    public CreateEntityCommand(T entity) {
        super(entity);
    }

    @Override
    public ArrayNode execute(Project project) {
        create(project);

        return null;
    }

    @Override
    public ArrayNode undo(Project project) {
        delete(project);
        return null;
    }

    @Override
    public ArrayNode redo(Project project) {
        return execute(project);
    }

}
