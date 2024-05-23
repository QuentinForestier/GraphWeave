package com.forestier.backend.controllers;

import com.forestier.backend.dto.models.ProjectDto;
import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import com.forestier.backend.services.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("{projectId}")
    public ProjectDto getProject(@PathVariable UUID projectId, @RequestHeader("Authorization") String token) {
        return convertToDto(projectService.getProject(projectId, JwtHelper.getUserFromToken(token)));
    }

    @GetMapping("")
    public List<ProjectDto> getProjects(@RequestHeader("Authorization") String token) {
        try {
            return projectService.allProjectsFromUser(JwtHelper.getUserFromToken(token)).stream().map(this::convertToDto).toList();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException("Invalid token");
        }

    }

    @PostMapping("")
    public ProjectDto createProject(@RequestBody ProjectDto dto, @RequestHeader("Authorization") String token) {
        Project project = convertToEntity(dto);
        return convertToDto(projectService.saveProject(project, JwtHelper.getUserFromToken(token)));
    }

    @DeleteMapping("{projectId}")
    public void deleteProject(@PathVariable UUID projectId, @RequestHeader("Authorization") String token) {

        projectService.deleteProject(projectId, JwtHelper.getUserFromToken(token));
    }

    @PutMapping("")
    public ProjectDto updateProject(@RequestBody ProjectDto dto, @RequestHeader("Authorization") String token) {
        if (dto.getId() == null)
            throw new IllegalArgumentException("Project id is required");
        Project project = convertToEntity(dto);

        return convertToDto(projectService.saveProject(project, JwtHelper.getUserFromToken(token)));
    }

    private ProjectDto convertToDto(Project project) {
        return modelMapper.map(project, ProjectDto.class);
    }

    private Project convertToEntity(ProjectDto dto) {
        //TODO: Do something when id already exists

        return modelMapper.map(dto, Project.class);
    }

}
