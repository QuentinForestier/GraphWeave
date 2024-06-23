package com.forestier.backend.commands;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.helper.ResponseCommandHelper;
import com.forestier.backend.models.ChatMessage;
import com.forestier.backend.models.Project;

public class ChatMessageCommand implements Command{
    ChatMessage chatMessage;

    public ChatMessageCommand(ChatMessage chatMessage) {
        this.chatMessage = chatMessage;
    }

    @Override
    public JsonNode execute(Project project) {
        return ResponseCommandHelper.createChatMessageResponse(chatMessage);
    }

    @Override
    public JsonNode undo(Project project) {
        return null;
    }

    @Override
    public JsonNode redo(Project project) {
        return null;
    }

    @Override
    public boolean requireEditPermission() {
        return false;
    }
}
