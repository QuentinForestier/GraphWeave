import {ActionIcon, List, Text, ThemeIcon} from "@mantine/core";
import {IconEdit, IconEditOff, IconEye} from "@tabler/icons-react";

interface ProjectItemProps {
    canEdit: boolean
}

const defaultProps: Partial<ProjectItemProps> = {
    canEdit: true,
}

export function ProjectItem(props: ProjectItemProps) {
    return (
        <List.Item
            p={"sm"}

            style={{
                border:"solid 1px",
                borderRadius:10
            }}
            icon=
                {<ActionIcon variant={"outline"}>
                    {props.canEdit ? <IconEdit/> : <IconEditOff/>}
                </ActionIcon>}

        >
            <Text ml={"sm"}>
            GraphWeave
            </Text>
        </List.Item>
    );
}