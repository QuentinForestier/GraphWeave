package com.forestier.backend.controllers;

import com.forestier.backend.dto.CollaboratorDto;
import com.forestier.backend.dto.CollaboratorEmailDto;
import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.helper.ModelConversionHelper;
import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.CollaboratorId;
import com.forestier.backend.services.CollaboratorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/collaborators")
public class CollaboratorController {
    @Autowired
    private CollaboratorService collaboratorService;

    @Autowired
    private ModelConversionHelper modelConversionHelper;

    @PostMapping("project/{projectId}")
    public CollaboratorDto addCollaboratorToProject(@RequestBody CollaboratorEmailDto dto, @PathVariable UUID projectId, @RequestHeader("Authorization") String token) {
        return modelConversionHelper.toCollaboratorDto(collaboratorService.createCollaborator(dto.getEmail(), projectId, JwtHelper.getUserFromToken(token)));
    }

    @DeleteMapping("project/{projectId}/user/{userId}")
    public void deleteCollaboratorOfProject(@PathVariable UUID projectId, @PathVariable UUID userId, @RequestHeader("Authorization") String token) {
        collaboratorService.deleteCollaborator(projectId, userId, JwtHelper.getUserFromToken(token));
    }

    @PutMapping("project/{projectId}")
    public CollaboratorDto updateCollaboratorOfProject(@RequestBody CollaboratorDto dto, @RequestHeader("Authorization") String token, @PathVariable String projectId) {
        Collaborator c = modelConversionHelper.toCollaborator(dto);
        c.setId(new CollaboratorId(UUID.fromString(projectId), dto.getUser().getId()));
        return modelConversionHelper.toCollaboratorDto(collaboratorService.updateCollaborator(c, JwtHelper.getUserFromToken(token)));
    }


}