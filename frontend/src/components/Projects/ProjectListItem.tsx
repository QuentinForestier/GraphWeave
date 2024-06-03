import {
    ActionIcon, Button,
    Center,
    Container, Divider,
    Flex,
    Group,
    List, NavLink,
    rem,
    Space,
    Text,
    ThemeIcon,
    UnstyledButton
} from "@mantine/core";
import {IconChevronRight, IconCrown, IconEdit, IconEditOff, IconEye, IconSettings} from "@tabler/icons-react";
import {notifications} from "@mantine/notifications";
import {modals} from "@mantine/modals";
import {ProjectModal} from "@/components/Projects/ProjectModal";
import {Project} from "@/models/Project";
import {useAuth} from "@/hooks/useAuth";
import {openProjectModals} from "@/helpers/ModalsHelper";

type ProjectListItemProps = {
    project: Project | undefined;
}

export function ProjectListItem({project}: ProjectListItemProps) {

    const {authenticatedUser} = useAuth();

    const collaborator = project?.collaborators?.find(value => value.user?.id === authenticatedUser?.id);


    return (<>

            <NavLink
                href={"/projects"}
                label={<Text ml={"sm"}>{project?.name}</Text>}
                leftSection={
                    (collaborator?.owner && <IconCrown/>) || (collaborator?.canEdit &&
                        <IconEdit/>) || (!collaborator?.canEdit && !collaborator?.owner && <IconEye/>)
                }
                rightSection={(collaborator?.owner &&
                    <ActionIcon variant={"default"} onClick={(event) => {
                        event.preventDefault();
                        openProjectModals("", project);
                    }}>

                        <IconSettings className="mantine-rotate-rtl"/>
                    </ActionIcon>)
                }
            />
        </>
    )
        ;
}