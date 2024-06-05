package com.forestier.backend.controllers;

import com.forestier.backend.dto.ChatMessage;
import com.forestier.backend.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

    @Autowired
    private AppService webSocketService;

    @MessageMapping("/projects/{projectId}")
    public void send(@Payload ChatMessage message, @Header("Authorization") String token, @DestinationVariable String projectId) throws Exception {
        webSocketService.handleProjectMessage(message, projectId, token);

    }
}
