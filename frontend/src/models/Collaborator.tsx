import {Project} from "@/models/Project";
import {User} from "@/models/User";

export type Collaborator = {
    user: User | undefined
    owner :boolean
    canEdit : boolean
}