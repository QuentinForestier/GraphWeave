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
import {ProjectInformations} from "@/components/ProjectInformations/ProjectInformations";

interface ProjectItemProps {
    canEdit?: boolean,
    isOwner?: boolean,
}

const defaultProps: Partial<ProjectItemProps> = {
    canEdit: false,
    isOwner: false,
}

export function ProjectItem(props: ProjectItemProps) {
    return (<>

            <NavLink
                href={"/projects"}

                variant={"subtle"}
                label={<Text ml={"sm"}>GraphWeave</Text>}
                leftSection={
                    (props.isOwner && <IconCrown/>) || (props.canEdit && <IconEdit/>) || (!props.canEdit && !props.isOwner && <IconEye/>)
                }
                rightSection={(props.isOwner &&
                    <ActionIcon variant={"default"} onClick={(event) => {
                        event.preventDefault();
                        modals.open({
                            title:'Project Information',
                            children:(
                                <ProjectInformations/>
                            )
                        })
                    }}>

                        <IconSettings className="mantine-rotate-rtl"/>
                    </ActionIcon>)
                }
            />
            <Divider/>
        </>
    )
        ;
}