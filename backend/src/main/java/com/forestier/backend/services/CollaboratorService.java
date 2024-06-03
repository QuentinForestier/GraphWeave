package com.forestier.backend.services;

import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.CollaboratorId;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import com.forestier.backend.repositories.CollaboratorRepository;
import com.forestier.backend.repositories.ProjectRepository;
import com.forestier.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CollaboratorService {

    @Autowired
    private UserService  userService;


    @Autowired
    private CollaboratorRepository collaboratorRepository;

public Collaborator createCollaborator(String email, UUID projectId, User owner) {
        Collaborator o = getCollaborator(projectId, owner.getId());
        if(!o.isOwner()) {
            throw new IllegalArgumentException("You are not the owner of the project");
        }

        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }

        Collaborator collaborator = getCollaborator(projectId, user.getId());
        if (collaborator != null) {
            throw new IllegalArgumentException("Collaborator already exists");
        }

        return createNewCollaborator(o.getProject(), user, false, false);
    }

    public Collaborator updateCollaborator(Collaborator collaborator, User owner) {

        Collaborator c = getCollaborator(collaborator.getId().getProjectId(), owner.getId());
        if(!c.isOwner()) {
            throw new IllegalArgumentException("You are not the owner of the project");
        }

        c = getCollaborator(collaborator.getId().getProjectId(), collaborator.getId().getUserId());
        if (c == null) {
            throw new IllegalArgumentException("Collaborator does not exist");
        }

        c.setCanEdit(collaborator.isCanEdit());
        c.setOwner(collaborator.isOwner());

        return collaboratorRepository.save(collaborator);
    }

    public List<Collaborator> allCollaboratorsFromProject(UUID projectId) {
        return collaboratorRepository.findByProjectId(projectId);
    }

    public void deleteCollaborator(UUID projectId, UUID userId, User owner) {
        Collaborator o = getCollaborator(projectId, owner.getId());

        if(o.isOwner()){

            collaboratorRepository.delete(getCollaborator(projectId, userId));
        } else {
            throw new IllegalArgumentException("You are not the owner of the project");
        }
    }

    public Collaborator getCollaborator(UUID projectId, UUID userId) {
        return collaboratorRepository.findByProjectIdAndUserId(projectId, userId);
    }

    public List<Collaborator> getCollaborationsOfUser(UUID userId) {
        return collaboratorRepository.findByUserId(userId);
    }

    Collaborator createNewCollaborator(Project p, User u, boolean isOwner, boolean canWrite) {
        Collaborator collaborator = new Collaborator();
        collaborator.setId(new CollaboratorId(u.getId(), p.getId()));
        collaborator.setUser(u);
        collaborator.setProject(p);
        collaborator.setOwner(isOwner);
        collaborator.setCanEdit(canWrite);
        return collaboratorRepository.save(collaborator);
    }
}
