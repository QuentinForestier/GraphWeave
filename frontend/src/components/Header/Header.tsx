import {
    AspectRatio,
    Burger,
    Group, Image,
    Title,
    UnstyledButton,
} from "@mantine/core";
import graphWeaveLogo from '../../logo.svg'
import {ColorSchemeToggle} from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import {AuthButton} from "@/components/Authentication/AuthButton";
import {MouseEventHandler, useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useLocation} from "react-router-dom";
import {openAuthModals} from "@/helpers/ModalsHelper";

interface HeaderProps {
    onAsideToggle?: MouseEventHandler<HTMLButtonElement>
    openedAside?: boolean
}

const defaultProps: Partial<HeaderProps> = {
    openedAside: false
};

export function Header(props: HeaderProps) {
    const {authenticatedUser} = useAuth();

    return (
        <>
            <Group justify="space-between">
                <UnstyledButton onClick={() => document.location.href = "/"} component={Group}
                                justify={"flex-start"}>
                    <AspectRatio maw={"var(--app-shell-header-height, px)"}>
                        <Image pl={"xs"} fit={"contain"} src={graphWeaveLogo} alt={"Logo"}/>
                    </AspectRatio>
                    <Title visibleFrom={"sm"}>GraphWeave</Title>
                </UnstyledButton>


                <Group pr={"xs"} mah={"var(--app-shell-header-height, px)"} h="100%">

                    <Title hidden={authenticatedUser === null} visibleFrom={"md"}
                           order={4}>Hello, {authenticatedUser?.username} !</Title>
                    <ColorSchemeToggle/>
                    <AuthButton/>
                    <Burger hidden={authenticatedUser === null} opened={props.openedAside}
                            onClick={props.onAsideToggle}/>
                </Group>
            </Group>
        </>
    );
}