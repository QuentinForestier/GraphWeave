package com.forestier.backend.controllers;

import com.forestier.backend.dto.models.CollaboratorDto;
import com.forestier.backend.dto.models.CollaboratorEmailDto;
import com.forestier.backend.helper.JwtHelper;
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
    private ModelMapper modelMapper;

    @PostMapping("project/{projectId}")
    public CollaboratorDto addCollaboratorToProject(@RequestBody CollaboratorEmailDto dto, @PathVariable UUID projectId, @RequestHeader("Authorization") String token) {
        return convertToDto(collaboratorService.createCollaborator(dto.getEmail(), projectId, JwtHelper.getUserFromToken(token)));
    }

    @DeleteMapping("project/{projectId}/user/{userId}")
    public void deleteCollaboratorOfProject(@PathVariable UUID projectId, @PathVariable UUID userId, @RequestHeader("Authorization") String token) {
        collaboratorService.deleteCollaborator(projectId, userId, JwtHelper.getUserFromToken(token));
    }

    @PutMapping("project/{projectId}")
    public CollaboratorDto updateCollaboratorOfProject(@RequestBody CollaboratorDto dto, @RequestHeader("Authorization") String token, @PathVariable String projectId) {
        Collaborator c = convertToEntity(dto);
        c.setId(new CollaboratorId(UUID.fromString(projectId), dto.getUser().getId()));
        return convertToDto(collaboratorService.updateCollaborator(c, JwtHelper.getUserFromToken(token)));
    }

    private CollaboratorDto convertToDto(Collaborator collaborator) {
        return modelMapper.map(collaborator, CollaboratorDto.class);
    }

    private Collaborator convertToEntity(CollaboratorDto dto){
        //TODO: Do something when id already exists
        return modelMapper.map(dto, Collaborator.class);
    }
}