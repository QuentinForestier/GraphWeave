import {Collaborator} from "@/models/Collaborator";

export type Project = {
    id?: string
    name: string
    collaborators?: Array<Collaborator>
}