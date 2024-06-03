import {Project} from "@/models/Project";
import axios from "axios";
import {url} from "@/api/requests/url";

export const getProjectsOfUser = async (token:string): Promise<Project[]> => {

    return axios({
        method: 'GET',
        url: url + '/api/projects',
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.data;
    })
}


export const createProject = async (project: Project, token:string): Promise<Project> => {
    return axios({
        method: 'POST',
        url: url + '/api/projects',
        data: project,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.data;
    })
}

export const updateProject = async (project: Project, token:string): Promise<Project> => {
    return axios({
        method: 'PUT',
        url: url + '/api/projects',
        data: project,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.data;
    })
}


export const deleteProject = async (project:Project, token:string): Promise<void> => {
    return axios({
        method:'DELETE',
        url:url+'/api/projects/'+project.id,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.data;
    })
}