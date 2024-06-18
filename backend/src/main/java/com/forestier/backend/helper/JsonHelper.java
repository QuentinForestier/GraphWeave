package com.forestier.backend.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonHelper {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String serialize(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

    public static JsonNode serializeToJsonNode(Object object) {
        return objectMapper.valueToTree(object);
    }

    public static <T> T deserialize(String json, Class<T> clazz) throws JsonProcessingException {
        return objectMapper.readValue(json, clazz);
    }

    // Create a function that take jsonNode and return a certain class
    public static <T> T deserialize(JsonNode json, Class<T> clazz) throws JsonProcessingException {
        return objectMapper.treeToValue(json, clazz);
    }
}
