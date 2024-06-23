package com.forestier.backend.commands.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.uml.entities.Entity;

public class DeleteEntityCommand<T extends Entity> extends EntityCommand<T> {


    public DeleteEntityCommand(T entity) {
        super(entity);
    }

    @Override
    public JsonNode execute(Project project) {
        delete(project);
        return null;
    }

    @Override
    public JsonNode undo(Project project) {
        create(project);
        return null;
    }

    @Override
    public JsonNode redo(Project project) {
        delete(project);
        return null;
    }


}
