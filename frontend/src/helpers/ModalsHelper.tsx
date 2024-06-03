import {modals} from "@mantine/modals";
import {AuthModal} from "@/components/Authentication/AuthModal";
import React from "react";
import {ProjectModal} from "@/components/Projects/ProjectModal";
import {Project} from "@/models/Project";


export const openAuthModals = () => {
    modals.open({
        title: 'GraphWeave Authentication',
        children: (
            <AuthModal/>
        )
    })
}


export const openProjectModals = (name?:string, project?:Project) => {
    modals.open({
        title: 'Project Information',
        children: (
            <ProjectModal name={name} project={project}/>
        )
    })
}