import {
    ActionIcon, Button,
    Divider, Fieldset, Group,
    Paper, rem, ScrollArea, Stack, TextInput, Title, Text
} from '@mantine/core';
import {useForm} from "@mantine/form";
import {SearchAddInput} from "@/components/SearchAddInput/SearchAddInput";
import {ProjectListItem} from "@/components/Projects/ProjectListItem";
import {CollaboratorListItem} from "@/components/Collaborator/CollaboratorListItem";
import {Project} from "@/models/Project";
import {IconDeviceFloppy, IconPlus, IconTrash} from "@tabler/icons-react";
import React, {useState} from "react";
import {useProjects} from "@/hooks/useProjects";
import {Collaborator} from "@/models/Collaborator";
import {CollaboratorList} from "@/components/Collaborator/CollaboratorList";
import {notifications} from "@mantine/notifications";
import {modals} from "@mantine/modals";

interface ProjectModalProps {
    name?: string,
    project?: Project,
}

const defaultProps: Partial<ProjectModalProps> = {
    name: "",
    project: undefined,
}

export function ProjectModal(props: ProjectModalProps) {

    const [projectName, setProjectName] = useState<string>(props.project ? props.project.name : props.name!);
    const [project, setProject] = useState<Project | undefined>(props.project);
    const {createNewProject, saveProject, removeProject} = useProjects();


    return (
        <>
            <Fieldset radius="md">
                <Stack>
                    <Title order={5}>Project's Name</Title>
                    <TextInput
                        radius="md"
                        size="md"
                        placeholder="Name of the project"
                        rightSectionWidth={42}
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                        rightSection={
                            <ActionIcon onClick={() => {
                                if (project) {
                                    saveProject({
                                        id: project!.id,
                                        name: projectName,
                                    }).then((project) => {
                                        setProject(project);
                                    })
                                } else {
                                    createNewProject({
                                        name: projectName,
                                    }).then((project: Project) => {
                                        setProject(project);
                                    })
                                }
                            }} size={32} radius="xl" variant="filled">
                                {project ?
                                    <IconDeviceFloppy style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                                    : <IconPlus style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                            </ActionIcon>
                        }
                    />
                    {project && (
                        <>
                            <Divider/>
                            <CollaboratorList project={project} collaborators={project.collaborators!}/>
                        </>
                    )}
                </Stack>
            </Fieldset>
            {project && (
                <Group m={"sm"} justify="end">
                    <Button onClick={() => {
                        removeProject(project!).then(() => {
                            notifications.show({
                                title: "Success",
                                message: "Your project has been removed",
                            })
                        });
                        modals.closeAll();
                    }} p={"xs"} color={"red"} rightSection={<IconTrash/>}>
                        Delete
                    </Button>
                </Group>
            )}
        </>
    );
}