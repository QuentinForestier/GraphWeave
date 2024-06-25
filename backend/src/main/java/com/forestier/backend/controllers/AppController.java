package com.forestier.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.models.ChatMessage;
import com.forestier.backend.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

@RestController
@MessageMapping("projects/{projectId}")
public class AppController {


    @Autowired
    private AppService appService;


    @MessageMapping("chat/send")
    public void send(@Payload ChatMessage message, @Header("Authorization") String token, @DestinationVariable String projectId) throws Exception {
        appService.handleChatMessage(message, projectId, token);
    }

    @MessageMapping("uml/create/entity/{entityType}")
    public void createEntity(@Payload JsonNode entityDto, @Header("Authorization") String token, @DestinationVariable String projectId, @DestinationVariable String entityType) throws Exception {
        appService.handleCreateEntity(entityDto, entityType, projectId, token);
    }

    @MessageMapping("uml/update/entity/{entityType}")
    public void updateEntity(@Payload JsonNode entityDto, @Header("Authorization") String token, @DestinationVariable String projectId, @DestinationVariable String entityType) throws Exception {
        appService.handleUpdateEntity(entityDto, entityType, projectId, token);
    }

    @MessageMapping("uml/delete/entity/{entityType}")
    public void deleteEntity(@Payload JsonNode entityDto, @Header("Authorization") String token, @DestinationVariable String projectId, @DestinationVariable String entityType) throws Exception {
        appService.handleDeleteEntity(entityDto, entityType, projectId, token);
    }

}
