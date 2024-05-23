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
            Project proj = createNewProject(project, user);
            return projectRepository.save(proj);
        } else {
            // Update existing project
            Collaborator collaborator = collaboratorService.getCollaborator(project.getId(), user.getId());
            if (!collaborator.isOwner())
                throw new IllegalArgumentException("User is not the owner of the project");

            return projectRepository.save(project);
        }
    }

    public void deleteProject(UUID projectId, User user) {
        Collaborator collaborator = collaboratorService.getCollaborator(projectId, user.getId());
        if (!collaborator.isOwner())
            throw new IllegalArgumentException("User is not the owner of the project");

        projectRepository.deleteById(projectId);
    }

    public Project getProject(UUID projectId, User user) {
        return collaboratorService.getCollaborator(projectId, user.getId()).getProject();
    }

    private Project createNewProject(Project project, User user) {

        Project proj = new Project();
        proj.setName(project.getName());
        proj.setCollaborators(new ArrayList(){
            {
                add(collaboratorService.createNewCollaborator(project.getId(), user.getId(), true, true));
            }
        });
        return proj;
    }

}
