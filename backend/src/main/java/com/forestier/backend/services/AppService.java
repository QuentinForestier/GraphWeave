package com.forestier.backend.services;

import com.forestier.backend.dto.ChatMessage;
import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;

@Service
public class AppService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    public void handleProjectMessage(ChatMessage message, String projectId, String token) {
        System.out.println(token);
        User u = JwtHelper.getUserFromToken(token);
        System.out.println("Received message: " + message.getText());
        message.setText(message.getText() + " - " + new SimpleDateFormat("HH:mm").format(System.currentTimeMillis()));
        simpMessagingTemplate.convertAndSendToUser(u.getEmail(), "/topic/project-updates/" + projectId, message);
        simpMessagingTemplate.convertAndSendToUser("quentin@quentin.ch", "/topic/project-updates/" + projectId, message);
    }
}
