package com.forestier.backend.services;

import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.CollaboratorId;
import com.forestier.backend.models.Project;
import com.forestier.backend.models.User;
import com.forestier.backend.repositories.CollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CollaboratorService {

    @Autowired
    private CollaboratorRepository collaboratorRepository;


    public Collaborator saveCollaborator(Collaborator collaborator) {
        return collaboratorRepository.save(collaborator);
    }

    public List<Collaborator> allCollaboratorsFromProject(UUID projectId) {
        return collaboratorRepository.findByProjectId(projectId);
    }

    public void deleteCollaborator(Collaborator collaborator) {
        //collaboratorRepository.deleteById(collaborator.getId());
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
        collaborator.setCanWrite(canWrite);
        return collaboratorRepository.save(collaborator);
    }
}
