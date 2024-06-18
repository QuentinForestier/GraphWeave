package com.forestier.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.commands.ChatMessageCommand;
import com.forestier.backend.commands.Command;
import com.forestier.backend.commands.entities.CreateEntityCommand;
import com.forestier.backend.commands.entities.DeleteEntityCommand;
import com.forestier.backend.commands.entities.UpdateEntityCommand;
import com.forestier.backend.dto.uml.entities.ClassDto;
import com.forestier.backend.dto.uml.entities.EntityDto;
import com.forestier.backend.dto.uml.entities.EnumDto;
import com.forestier.backend.helper.EntityConversionHelper;
import com.forestier.backend.helper.JsonHelper;
import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.helper.ResponseCommandHelper;
import com.forestier.backend.models.ChatMessage;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import com.forestier.backend.models.uml.ClassDiagram;
import com.forestier.backend.models.uml.entities.Class;
import com.forestier.backend.models.uml.entities.Entity;
import com.forestier.backend.models.uml.entities.Enum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.Callable;

@Service
public class AppService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ProjectService projectService;

    private final ArrayList<Project> projects = new ArrayList<>();

    public void handleChatMessage(ChatMessage message, String projectId, String token) {
        User u = JwtHelper.getUserFromToken(token);
        message.setAuthor(u.getUsername());
        message.setDate(new SimpleDateFormat("HH:mm").format(new Date()));
        ChatMessageCommand command = new ChatMessageCommand(message);
        handleCommand(command, projectId, token);
    }

    public void handleCreateEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "class" ->
                    newEntityCommand(CreateEntityCommand.class, Class.class, JsonHelper.deserialize(dto, ClassDto.class));
            case "enum" ->
                    newEntityCommand(CreateEntityCommand.class, Enum.class, JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token);
    }

    public void handleUpdateEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "class" ->
                    newEntityCommand(UpdateEntityCommand.class, Class.class, JsonHelper.deserialize(dto, ClassDto.class));
            case "enum" ->
                    newEntityCommand(UpdateEntityCommand.class, Enum.class, JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token);
    }

    public void handleDeleteEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "class" ->
                    newEntityCommand(DeleteEntityCommand.class, Class.class, JsonHelper.deserialize(dto, ClassDto.class));
            case "enum" ->
                    newEntityCommand(DeleteEntityCommand.class, Enum.class, JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token);
    }

    private void handleCommand(Command command, String projectId, String token, String... users) {
        User u = JwtHelper.getUserFromToken(token);
        Project project = getOrLoadProject(projectId, u);
        if (command.requireEditPermission() && !checkEditPermission(project, u)) {
            return;
        }
        ArrayNode json = command.execute(project);

        String topic = ResponseCommandHelper.consumeTopic(json, projectId);
        if (users.length > 0) {
            for (String user : users) {
                sendToUser(user, json, topic);
            }
        } else {
            send(json, topic);
        }
    }

    private <T, U extends Entity> Command newEntityCommand(java.lang.Class<T> commandClass, java.lang.Class<U> entityType, EntityDto dto) {
        try {
            Entity e = EntityConversionHelper.convertToEntity(dto);

            Constructor<T> constructor = commandClass.getConstructor(Entity.class);
            return (Command) constructor.newInstance(e);

        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid entity type");
        }
    }

    private Project getOrLoadProject(String projectId, User user) {

        UUID projectUuid = UUID.fromString(projectId);
        for (Project p : projects) {
            if (p.getId().equals(projectUuid)) {
                return p;
            }
        }
        Project p = projectService.getProject(projectUuid, user);
        projects.add(p);
        p.setDiagram(new ClassDiagram());
        return p;
    }


    private boolean checkEditPermission(Project project, User user) {
        return project.getCollaborators().stream().anyMatch(c -> c.getUser().getId().equals(user.getId()) && c.isCanEdit());
    }


    private void sendToUser(String user, ArrayNode json, String topic) {
        simpMessagingTemplate.convertAndSendToUser(user, topic, json);
    }


    private void send(ArrayNode json, String topic) {
        simpMessagingTemplate.convertAndSend(topic, json);
    }
}
