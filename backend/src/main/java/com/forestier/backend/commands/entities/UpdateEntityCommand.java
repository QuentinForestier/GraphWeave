package com.forestier.backend.commands.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.helper.JsonHelper;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.uml.entities.Entity;

public class UpdateEntityCommand<T extends Entity> extends EntityCommand<T> {

    private T oldEntity;

    public UpdateEntityCommand(T entity) {
        super(entity);
    }

    @Override
    public JsonNode execute(Project project) {
        try {
            oldEntity = (T) JsonHelper.deserialize(JsonHelper.serialize(project.getDiagram().getEntity(entity.getId())), entity.getClass());
        } catch (Exception e) {
            oldEntity = null;
        }
        return update(project);
    }

    @Override
    public JsonNode undo(Project project) {
        T tmp = entity;
        entity = oldEntity;
        oldEntity = tmp;
        return update(project);
    }

    @Override
    public JsonNode redo(Project project) {
        T tmp = entity;
        entity = oldEntity;
        oldEntity = tmp;
        return update(project);
    }
}
