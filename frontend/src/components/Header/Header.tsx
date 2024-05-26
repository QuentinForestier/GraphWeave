import {
    AspectRatio,
    Burger,
    Group, Image, Modal,
    Title,
    UnstyledButton,
    useMantineTheme
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import graphWeaveLogo from '../../logo.svg'
import {AuthForm} from "@/components/AuthForm/AuthForm";
import {ColorSchemeToggle} from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import {AuthButton} from "@/components/AuthToggle/AuthButton";
import {MouseEventHandler} from "react";

interface HeaderProps{
    onAsideToggle?: MouseEventHandler<HTMLButtonElement>
    openedAside?: boolean
}

const defaultProps: Partial<HeaderProps> = {
    openedAside: false
};

export function Header(props: HeaderProps) {
    const [openedModal, {open, close}] = useDisclosure(false);



    let username = "Quentin";
    let connected = false;

    return (
        <>
            <Group justify="space-between" >
                <UnstyledButton onClick={() => document.location.href = "/"} component={Group}
                                justify={"flex-start"}>
                    <AspectRatio maw={"var(--app-shell-header-height, px)"}>
                        <Image pl={"xs"} fit={"contain"} src={graphWeaveLogo} alt={"Logo"}/>
                    </AspectRatio>
                    <Title visibleFrom={"sm"}>GraphWeave</Title>
                </UnstyledButton>


                <Group pr={"xs"} mah={"var(--app-shell-header-height, px)"} h="100%">
                    <Title visibleFrom={"md"} order={4}>Hello, {username} !</Title>
                    <ColorSchemeToggle/>
                    <AuthButton onToggle={open} auth={connected} />
                    <Burger opened={props.openedAside} onClick={props.onAsideToggle} />
                </Group>
            </Group>

            <Modal opened={openedModal} onClose={close} title={"Sign In"}>
                <AuthForm/>
            </Modal>
        </>
    );
}