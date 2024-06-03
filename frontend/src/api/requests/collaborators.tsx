import {Collaborator} from "@/models/Collaborator";
import axios from "axios";
import {url} from "@/api/requests/url";
import {Project} from "@/models/Project";
import {User} from "@/models/User";

export const newCollaborator = async (email: string, project: Project, token: string) => {
    return axios({
        method: 'POST',
        url: url + "/api/collaborators/project/" + project.id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {email}
    }).then(response => {
        return response.data;
    })
}

export const updateCollaborator = async (collaborator: Collaborator, project: Project, token: string) => {
    return axios({
        method:'PUT',
        url: url + "/api/collaborators/project/" + project.id,
        headers:{
            Authorization: `Bearer ${token}`,
        },
        data: collaborator
    }).then(response => {
        return response.data;
    })
}


export const deleteCollaborator = async (collaborator: Collaborator, project: Project, token:string) => {
    return axios({
        method:'DELETE',
        url: url + '/api/collaborators/project/' + project.id + '/user/' + collaborator.user!.id,
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        return response.data;
    })
}