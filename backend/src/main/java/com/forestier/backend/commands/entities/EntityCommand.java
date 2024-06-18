package com.forestier.backend.commands.entities;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.commands.Command;
import com.forestier.backend.commands.CommandType;
import com.forestier.backend.helper.ResponseCommandHelper;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.uml.entities.Entity;

public abstract class EntityCommand<T extends Entity> implements Command {
    protected T entity;


    public EntityCommand(T entity) {
        this.entity = entity;
    }

    protected ArrayNode create(Project p) {
        p.getDiagram().addEntity(entity);
        return ResponseCommandHelper.createEntityResponse(CommandType.CREATE, entity);
    }

    protected ArrayNode delete(Project p) {
        entity = (T) p.getDiagram().getEntity(entity.getId());
        p.getDiagram().removeEntity(entity);
        return ResponseCommandHelper.createEntityResponse(CommandType.REMOVE, entity);
    }

    protected ArrayNode update(Project p) {
        p.getDiagram().updateEntity(entity);
        return ResponseCommandHelper.createEntityResponse(CommandType.UPDATE, entity);
    }


    @Override
    public boolean requireEditPermission() {
        return true;
    }

}
