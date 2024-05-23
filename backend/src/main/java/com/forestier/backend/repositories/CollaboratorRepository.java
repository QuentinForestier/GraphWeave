package com.forestier.backend.repositories;

import com.forestier.backend.models.Collaborator;
import com.forestier.backend.models.CollaboratorId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CollaboratorRepository extends JpaRepository<Collaborator, CollaboratorId> {
    Collaborator findByProjectIdAndUserId(UUID projectId, UUID userId);

    List<Collaborator> findByUserId(UUID userId);
    List<Collaborator> findByProjectId(UUID projectId);
}
