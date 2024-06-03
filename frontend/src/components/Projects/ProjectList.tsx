import {
    AppShell, Box,
    Divider, Drawer, Group,
    ScrollArea, Space,
    Title,
} from "@mantine/core";
import {modals} from "@mantine/modals";
import {ProjectModal} from "@/components/Projects/ProjectModal";
import {ProjectListItem} from "@/components/Projects/ProjectListItem";
import {SearchAddInput} from "@/components/SearchAddInput/SearchAddInput";
import React, {useState} from "react";
import {Project} from "@/models/Project";
import {useProjects} from "@/hooks/useProjects";
import {openProjectModals} from "@/helpers/ModalsHelper";


type ProjectListProps = {
    opened: boolean,
    toggle: () => void
}

export function ProjectList(props: ProjectListProps) {
    const [filterInput, setFilterInput] = useState<string>("");

    const {projects} = useProjects();


    return (
        <Drawer.Root opened={props.opened}
                     onClose={props.toggle}
                     position={"right"}
                     padding={"lg"}
                     size={"sm"}
                     scrollAreaComponent={ScrollArea.Autosize}>
            <Drawer.Overlay blur={4} backgroundOpacity={0.5}/>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>
                        Projects List
                    </Drawer.Title>
                    <Drawer.CloseButton/>
                </Drawer.Header>
                <Drawer.Body>
                    <SearchAddInput placeholder={"Search or create a project"}
                                    onAddClick={() => {
                                        openProjectModals(filterInput);
                                    }}
                                    onChange={(event) => {
                                        setFilterInput(event.currentTarget.value);
                                    }}
                    />
                    {
                        projects.length > 0 && projects
                            .filter((p) => p.name.toLowerCase().includes(filterInput.toLowerCase()))
                            .sort((p1: Project, p2: Project) => p1.name.localeCompare(p2.name))
                            .map((p) => {
                                return (
                                    <Box key={p.id} m={"sm"}>
                                        <ProjectListItem project={p}/>
                                        <Divider/>
                                    </Box>
                                );
                            })
                    }
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
        ;
}