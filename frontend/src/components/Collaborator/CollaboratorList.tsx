import {
    ActionIcon, AppShell, Box, Button,
    Center, Combobox,
    Container, Divider,
    Flex,
    Group,
    List, NavLink,
    rem, ScrollArea,
    Space,
    Text,
    ThemeIcon, Title,
    UnstyledButton
} from "@mantine/core";
import {SearchAddInput} from "@/components/SearchAddInput/SearchAddInput";
import React, {useState} from "react";
import {Project} from "@/models/Project";
import {useProjects} from "@/hooks/useProjects";
import {CollaboratorListItem} from "@/components/Collaborator/CollaboratorListItem";
import {Collaborator} from "@/models/Collaborator";

interface CollaboratorListProps {
    collaborators: Collaborator[];
    project:Project
}

export function CollaboratorList(props: CollaboratorListProps) {

    const [filterInput, setFilterInput] = useState<string>("");
    const [collaborators, setCollaborators] = useState<Collaborator[]>(props.collaborators)
    const {addCollaborator} = useProjects();

    return (
        <>
            <Title order={5}>Collaborators</Title>
            <SearchAddInput
                value={filterInput}
                onInputChange={(event) => {
                    setFilterInput(event.currentTarget.value);
                }}
                onButtonClick={() => {
                    addCollaborator(filterInput, props.project).then((collaborator: Collaborator) => {
                        setFilterInput("");
                        // add collaborator to list using setCollaborator
                        setCollaborators(prevState => [...prevState, collaborator]);
                    })
                }}
                placeholder="Search or add a collaborator"/>
            <ScrollArea.Autosize mah={"24vh"} type={"hover"}>
                {
                    collaborators
                        .filter((c) => c.user?.email.toLowerCase().includes(filterInput.toLowerCase()))
                        .sort((c1: Collaborator, c2: Collaborator) => c1.user!.email.localeCompare(c2.user!.email))
                        .map((collaborator: Collaborator) => {
                            return (
                                <CollaboratorListItem project={props.project} setCollaborators={setCollaborators} collaborators={collaborators} key={collaborator.user?.id}
                                                      collaborator={collaborator}/>

                            )
                        })
                }
            </ScrollArea.Autosize>

        </>
    )
        ;
}