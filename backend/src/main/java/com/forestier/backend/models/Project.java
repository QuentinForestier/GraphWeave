package com.forestier.backend.models;

import com.forestier.backend.uml.ClassDiagram;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;


    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Collaborator> collaborators;

    @Transient
    private ClassDiagram diagram;

    @Transient
    private static final Map<UUID, Project> openProjects = new HashMap<>();

    @Transient
    private Timer autoSaveTimer = new Timer();




}
