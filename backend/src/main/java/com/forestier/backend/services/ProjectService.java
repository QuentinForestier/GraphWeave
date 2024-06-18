package com.forestier.backend.services;

import com.forestier.backend.helper.JwtHelper;
import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.CollaboratorId;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import com.forestier.backend.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CollaboratorService collaboratorService;

    public List<Project> allProjectsFromUser(User user) {

        List<Collaborator> collaborators = collaboratorService.getCollaborationsOfUser(user.getId());
        return collaborators.stream().map(Collaborator::getProject).toList();
    }


    public Project saveProject(Project project, User user) {
        if (project.getId() == null) {
            // Create new project
            return createNewProject(project, user);

        } else {
            // Update existing project
            Collaborator collaborator = collaboratorService.getCollaborator(project.getId(), user.getId());
            if (!collaborator.isOwner())
                throw new IllegalArgumentException("User is not the owner of the project");

            // Avoid updating the collaborators. Not the best way to do it, but it works for now
            Project p = projectRepository.findById(project.getId()).orElseThrow();
            p.setName(project.getName());
            return projectRepository.save(p);
        }
    }

    public void deleteProject(UUID projectId, User user) {
        Collaborator collaborator = collaboratorService.getCollaborator(projectId, user.getId());
        if (!collaborator.isOwner())
            throw new IllegalArgumentException("User is not the owner of the project");

        projectRepository.deleteById(projectId);
    }

    public Project getProject(UUID projectId, User user) {

        // Get project from repository
        Project project = projectRepository.findById(projectId).
                orElseThrow(() -> new IllegalArgumentException("Project not found"));
        // Check if user is a collaborator
        project.getCollaborators().stream().filter(c -> c.getUser().getId().equals(user.getId())).
                findFirst().orElseThrow(() -> new IllegalArgumentException("User is not a collaborator of the project"));
        return project;
    }

    private Project createNewProject(Project project, User user) {

        Project proj = new Project();
        proj.setName(project.getName());
        proj.setCollaborators(new ArrayList<>());

        proj = projectRepository.save(proj);
        Collaborator collaborator = collaboratorService.createNewCollaborator(proj, user, true, true);
        proj.getCollaborators().add(collaborator);
        return proj;
    }

}
