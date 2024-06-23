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


    private static final String createEntityTopic = "/topic/projectId/create/entity";
    private static final String updateEntityTopic = "/topic/projectId/update/entity";
    private static final String deleteEntityTopic = "/topic/projectId/delete/entity";
    private static final String chatTopic = "/topic/projectId/chat";

    private final ArrayList<Project> projects = new ArrayList<>();

    public void handleChatMessage(ChatMessage message, String projectId, String token) {
        User u = JwtHelper.getUserFromToken(token);
        message.setAuthor(u.getUsername());
        message.setDate(new SimpleDateFormat("HH:mm").format(new Date()));
        ChatMessageCommand command = new ChatMessageCommand(message);
        handleCommand(command, projectId, token, chatTopic.replace("projectId", projectId));
    }

    public void handleCreateEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "Class" ->
                    newEntityCommand(CreateEntityCommand.class, JsonHelper.deserialize(dto, ClassDto.class));
            case "Enum" ->
                    newEntityCommand(CreateEntityCommand.class, JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token, createEntityTopic.replace("projectId", projectId));
    }

    public void handleUpdateEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "Class" ->
                    newEntityCommand(UpdateEntityCommand.class,  JsonHelper.deserialize(dto, ClassDto.class));
            case "Enum" ->
                    newEntityCommand(UpdateEntityCommand.class,  JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token, updateEntityTopic.replace("projectId", projectId));
    }

    public void handleDeleteEntity(JsonNode dto, String entityType, String projectId, String token) throws JsonProcessingException {
        Command command = switch (entityType) {
            case "Class" ->
                    newEntityCommand(DeleteEntityCommand.class, JsonHelper.deserialize(dto, ClassDto.class));
            case "Enum" ->
                    newEntityCommand(DeleteEntityCommand.class, JsonHelper.deserialize(dto, EnumDto.class));
            default -> throw new IllegalArgumentException("Invalid entity type");
        };

        handleCommand(command, projectId, token, deleteEntityTopic.replace("projectId", projectId));
    }

    private void handleCommand(Command command, String projectId, String token, String topic, String... users) {
        User u = JwtHelper.getUserFromToken(token);
        Project project = getOrLoadProject(projectId, u);
        if (command.requireEditPermission() && !checkEditPermission(project, u)) {
            return;
        }
        JsonNode json = command.execute(project);

        if (users.length > 0) {
            for (String user : users) {
                sendToUser(user, json, topic);
            }
        } else {
            send(json, topic);
        }
    }

    private <T, U extends Entity> Command newEntityCommand(java.lang.Class<T> commandClass, EntityDto dto) {
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

        Project alreadyLoaded = projects.stream().filter(p -> p.getId().equals(projectUuid)).findFirst().orElse(null);
        if (alreadyLoaded != null) {
            alreadyLoaded.getCollaborators().stream().filter(c -> c.getUser().getId().equals(user.getId())).
                    findFirst().orElseThrow(() -> new IllegalArgumentException("User is not a collaborator of the project"));
            return alreadyLoaded;
        }


        Project p = projectService.getProject(projectUuid, user);
        projects.add(p);
        p.setDiagram(new ClassDiagram());
        return p;
    }


    private boolean checkEditPermission(Project project, User user) {
        return project.getCollaborators().stream().anyMatch(c -> c.getUser().getId().equals(user.getId()) && c.isCanEdit());
    }


    private void sendToUser(String user, JsonNode json, String topic) {
        simpMessagingTemplate.convertAndSendToUser(user, topic, json);
    }


    private void send(JsonNode json, String topic) {
        simpMessagingTemplate.convertAndSend(topic, json);
    }
}
