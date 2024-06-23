package com.forestier.backend.helper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.forestier.backend.models.ChatMessage;
import com.forestier.backend.models.uml.entities.Entity;

public class ResponseCommandHelper {




    public static JsonNode createEntityResponse(Entity entity) {
        ObjectNode node = (ObjectNode) JsonHelper.serializeToJsonNode(EntityConversionHelper.convertToEntityDto(entity));
        node.put("type", entity.getClass().getSimpleName());
        return node;
    }

    public static JsonNode createChatMessageResponse(ChatMessage message) {
        return JsonHelper.serializeToJsonNode(message);
    }


}
