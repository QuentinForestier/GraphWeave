package com.forestier.backend.commands;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.models.Project;

public interface Command {
    JsonNode execute(Project project);
    JsonNode undo(Project project);
    JsonNode redo(Project project);

    boolean requireEditPermission();
}
