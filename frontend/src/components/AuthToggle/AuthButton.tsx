import {IconLogout, IconUserQuestion} from "@tabler/icons-react";
import cx from "clsx";
import classes from "@/components/Header/Header.module.css";
import {ActionIcon, Group} from "@mantine/core";
import {MouseEventHandler} from "react";

interface AuthToggleProps {
    onToggle?: MouseEventHandler<HTMLButtonElement>
    auth?: boolean
}

const defaultProps: Partial<AuthToggleProps> = {
    auth: false
};

export function AuthButton(props: AuthToggleProps) {
    return (
        <Group justify="center">
            <ActionIcon
                onClick={props.onToggle}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                {props.auth ? (
                        <IconLogout className={cx(classes.icon, classes.light)} stroke={1.5}/>
                    ) :
                    <IconUserQuestion className={cx(classes.icon, classes.light)} stroke={1.5}/>

                }
            </ActionIcon>
        </Group>
    );
}