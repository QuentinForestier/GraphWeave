import React, {createContext, useContext, useEffect, useState} from "react";
import {Project} from "@/models/Project";
import {useAuth} from "@/hooks/useAuth";
import {createProject, deleteProject, getProjectsOfUser, updateProject} from "@/api/requests/projects";
import {Collaborator} from "@/models/Collaborator";
import {deleteCollaborator, newCollaborator, updateCollaborator as updateCollab} from "@/api/requests/collaborators";

type ProjectsContextType = {
    projects: Project[];
    createNewProject: (project: Project) => Promise<Project>
    refreshProjects: () => Promise<void>
    saveProject: (project: Project) => Promise<Project>
    removeProject: (project: Project) => Promise<void>
    addCollaborator: (email: string, project: Project) => Promise<Collaborator>
    updateCollaborator: (collaborator: Collaborator, project: Project) => Promise<Collaborator>
    removeCollaborator: (collaborator: Collaborator, project: Project) => Promise<void>
}

const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType)


const ProjectsProvider = ({children}: { children: React.ReactNode }) => {
    const {token} = useAuth();
    const [projects, _setProjects] = useState<Array<Project>>([]);


    const refreshProjects = async () => {
        return new Promise<void>((resolve, reject) => {
            getProjectsOfUser(token).then((projects: Project[]) => {
                _setProjects(projects);
                resolve();
            })
        })
    }

    const createNewProject = async (project: Project): Promise<Project> => {
        return new Promise<Project>((resolve, reject) => {
            createProject(project, token).then((data: Project) => {
                refreshProjects();
                resolve(data);
            })
        })
    }

    const saveProject = async (project: Project): Promise<Project> => {
        return new Promise<Project>((resolve, reject) => {
            updateProject(project, token).then((data: Project) => {
                refreshProjects();
                resolve(data);
            })
        })
    }

    const removeProject = async (project: Project): Promise<void> => {
        return new Promise(resolve => {
            deleteProject(project, token).then(() => {
                refreshProjects();
                resolve();
            });
        })
    }

    const addCollaborator = async (email: string, project: Project): Promise<Collaborator> => {
        return new Promise<Collaborator>(resolve => {
            newCollaborator(email, project, token).then((data: Collaborator) => {
                refreshProjects();
                resolve(data);
            });
        })
    }

    const updateCollaborator = async (collaborator: Collaborator, project: Project): Promise<Collaborator> => {
        return new Promise<Collaborator>((resolve, reject) => {
            updateCollab(collaborator, project, token).then((data: Collaborator) => {
                refreshProjects();
                resolve(data);
            });
        })
    }

    const removeCollaborator = async (collaborator: Collaborator, project: Project): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            deleteCollaborator(collaborator, project, token).then((data: Collaborator) => {
                refreshProjects();
                resolve();
            })
        })
    }

    useEffect(() => {
        if (token)
            refreshProjects();
    }, [])

    return (
        <ProjectsContext.Provider value={{
            projects,
            createNewProject,
            refreshProjects,
            saveProject,
            removeProject,
            addCollaborator,
            updateCollaborator,
            removeCollaborator
        }}>
            {children}
        </ProjectsContext.Provider>
    )
}


export {ProjectsProvider, ProjectsContext};