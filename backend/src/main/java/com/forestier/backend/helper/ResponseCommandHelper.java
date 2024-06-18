package com.forestier.backend.helper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.forestier.backend.commands.CommandType;
import com.forestier.backend.models.ChatMessage;
import com.forestier.backend.models.uml.entities.Entity;

public class ResponseCommandHelper {

    private static final ObjectMapper mapper = new ObjectMapper();

    private static final String umlTopic = "/topic/projectId/uml-update";
    private static final String chatTopic = "/topic/projectId/chat";

    public static ArrayNode createEntityResponse(CommandType commandType, Entity entity) {
        ArrayNode result = mapper.createArrayNode();

        result.add(createTopicNode(umlTopic));
        JsonNode node = JsonHelper.serializeToJsonNode(EntityConversionHelper.convertToEntityDto(entity));
        ((ObjectNode) node).put("command", commandType.toString());
        result.add(node);
        return result;
    }

    public static ArrayNode createChatMessageResponse(ChatMessage message) {
        ArrayNode result = mapper.createArrayNode();
        result.add(createTopicNode(chatTopic));
        result.add(JsonHelper.serializeToJsonNode(message));
        return result;
    }

    public static String consumeTopic(ArrayNode node, String projectId) {
        String topic = node.get(0).get("topic").asText();
        node.remove(0);
        return topic.replace("projectId", projectId);
    }

    private static ObjectNode createTopicNode(String topic) {
        ObjectNode node = mapper.createObjectNode();
        node.put("topic", topic);
        return node;
    }
}
