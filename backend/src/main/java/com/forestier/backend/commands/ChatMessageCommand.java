package com.forestier.backend.commands;

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
    public ArrayNode execute(Project project) {
        return ResponseCommandHelper.createChatMessageResponse(chatMessage);
    }

    @Override
    public ArrayNode undo(Project project) {
        return null;
    }

    @Override
    public ArrayNode redo(Project project) {
        return null;
    }

    @Override
    public boolean requireEditPermission() {
        return false;
    }
}
