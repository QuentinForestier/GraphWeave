package com.forestier.backend.models.uml;

import com.forestier.backend.dto.uml.entities.EntityDto;
import com.forestier.backend.helper.EntityConversionHelper;
import com.forestier.backend.models.uml.entities.Entity;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.UUID;

@Getter
public class ClassDiagram {

    private final ArrayList<Entity> entities = new ArrayList<>();

    public void addEntity(Entity entity) {
        if(entity.getId() == null)
            entity.setId(UUID.randomUUID().toString());
        entities.add(entity);
    }

    public Entity getEntity(String id)
    {
        Entity e =
                (Entity) entities.stream().filter(e1 -> e1.getId().equals(id)).findFirst().orElse(null);
        if (e == null)
            throw new IllegalArgumentException("Entity does not exist");
        return e;
    }

    public void removeEntity(Entity entity)
    {
        entities.remove(entity);
       // existingTypes.removeType(entity);
    }

    public void updateEntity(Entity e) {
        Entity entity = getEntity(e.getId());
        EntityConversionHelper.updateEntity(e, entity);

    }
}
