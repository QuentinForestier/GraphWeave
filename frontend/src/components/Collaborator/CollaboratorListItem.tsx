import {
    ActionIcon, Button,
    Center,
    Container, Divider,
    Flex,
    Group,
    List, NavLink,
    rem, SegmentedControl,
    Space,
    Text,
    ThemeIcon,
    UnstyledButton
} from "@mantine/core";
import {
    IconChevronRight,
    IconCrown,
    IconEdit,
    IconEditOff,
    IconEye,
    IconSettings, IconTrash
} from "@tabler/icons-react";
import {Collaborator} from "@/models/Collaborator";
import {useProjects} from "@/hooks/useProjects";
import {Project} from "@/models/Project";
import {useState} from "react";

interface CollaboratorListItemProps {
    collaborator: Collaborator;
    project: Project;
    setCollaborators: (collaborators: Collaborator[]) => void;
    collaborators: Collaborator[];
}


export function CollaboratorListItem(props: CollaboratorListItemProps) {
    const {updateCollaborator, removeCollaborator} = useProjects();
    const [collaborator, setCollaborator] = useState<Collaborator>(props.collaborator)

    return (<>
            <Group justify={"space-between"} p={"xs"}>
                <Text ml={"sm"}>{collaborator.user?.email}</Text>
                <Group>
                    {(collaborator.owner && <IconCrown/>)}
                    <SegmentedControl
                        defaultValue={collaborator.canEdit || collaborator.owner ? "edit" : "view"}
                        onChange={(value) => {

                            updateCollaborator({
                                canEdit: value === "edit",
                                owner: collaborator.owner,
                                user: collaborator.user
                            }, props.project).then((collaborator) => {
                                setCollaborator(collaborator);
                            });

                        }}
                        data={[
                            {
                                value: 'view',
                                label: (
                                    <Center style={{gap: 10}}>
                                        <IconEye style={{width: rem(16), height: rem(16)}}/>
                                    </Center>
                                ),
                                disabled: collaborator.owner
                            },
                            {
                                value: 'edit',
                                label: (
                                    <Center style={{gap: 10}}>
                                        <IconEdit style={{width: rem(16), height: rem(16)}}/>
                                    </Center>
                                ),
                            }
                        ]}/>
                    <ActionIcon onClick={() => {
                        removeCollaborator(collaborator, props.project).then((data) => {
                            props.setCollaborators(props.collaborators
                                .filter((c) => c.user?.id !== collaborator.user?.id));
                        })
                    }} color={"red"} disabled={collaborator.owner}>
                        <IconTrash/>
                    </ActionIcon>
                </Group>
            </Group>

        </>
    )
        ;
}