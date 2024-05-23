package com.forestier.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Collaborator {

    @EmbeddedId
    private CollaboratorId id;

    @ManyToOne(optional = false)
    @MapsId("userId")
    private User user;

    @ManyToOne(optional = false)
    @MapsId("projectId")
    private Project project;

    @Column(nullable = false)
    private boolean isOwner;

    @Column(nullable = false)
    private boolean canWrite;

    public Collaborator(User user, Project project, boolean isOwner, boolean canWrite)
    {
        this.user = user;
        this.project = project;
        this.isOwner = isOwner;
        this.canWrite = canWrite;
    }


}
