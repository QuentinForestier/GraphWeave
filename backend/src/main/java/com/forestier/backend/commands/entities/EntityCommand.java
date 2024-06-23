package com.forestier.backend.commands.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.forestier.backend.commands.Command;
import com.forestier.backend.helper.ResponseCommandHelper;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.uml.entities.Entity;

public abstract class EntityCommand<T extends Entity> implements Command {
    protected T entity;


    public EntityCommand(T entity) {
        this.entity = entity;
    }

    protected JsonNode create(Project p) {
        p.getDiagram().addEntity(entity);
        return ResponseCommandHelper.createEntityResponse(entity);
    }

    protected JsonNode delete(Project p) {
        entity = (T) p.getDiagram().getEntity(entity.getId());
        p.getDiagram().removeEntity(entity);
        return ResponseCommandHelper.createEntityResponse(entity);
    }

    protected JsonNode update(Project p) {
        p.getDiagram().updateEntity(entity);
        return ResponseCommandHelper.createEntityResponse(entity);
    }


    @Override
    public boolean requireEditPermission() {
        return true;
    }

}
