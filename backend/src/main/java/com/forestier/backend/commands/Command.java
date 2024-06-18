package com.forestier.backend.commands;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.forestier.backend.models.Project;

public interface Command {
    ArrayNode execute(Project project);
    ArrayNode undo(Project project);
    ArrayNode redo(Project project);

    boolean requireEditPermission();
}
