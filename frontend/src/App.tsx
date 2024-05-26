import '@mantine/core/styles.css';
import {
    AppShell,
    AspectRatio,
    Burger, Button, Center,
    Combobox, Divider, Drawer,
    Group, Image, List,
    MantineProvider,
    Modal, ScrollArea, Text,
    Title,
    UnstyledButton
} from '@mantine/core';
import {Router} from './Router';
import {theme} from './theme';
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import {Header} from './components/Header/Header';
import graphWeaveLogo from './logo.svg'
import {AuthForm} from "@/components/AuthForm/AuthForm";
import {ColorSchemeToggle} from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import {AuthButton} from "@/components/AuthToggle/AuthButton";
import {SearchAddInput} from "@/components/SearchAddInput/SearchAddInput";
import {ProjectItem} from "@/components/ProjectItem/ProjectItem";


export default function App() {
    const [openedAside, {toggle}] = useDisclosure(false);

    let username = "Quentin";

    return (
        <MantineProvider theme={theme}>
            <AppShell

                padding={{base: 10, sm: 15, lg: 'xl'}}
                header={
                    {height: {base: 65, sm: 78, lg: 90}}}
                aside={{
                    width: {sm: 250, lg: 300},
                    breakpoint: 'sm',
                    collapsed: {mobile: !openedAside, desktop: !openedAside}
                }}
            >
                <AppShell.Header
                    withBorder={false}>

                    <Header openedAside={openedAside} onAsideToggle={toggle}/>
                </AppShell.Header>
                <AppShell.Aside
                    withBorder={true}>
                    <AppShell.Section
                        p={"sm"}>
                        <SearchAddInput/>
                    </AppShell.Section>
                    <AppShell.Section
                        grow
                        p={"sm"}>
                        <List
                            withPadding
                            spacing={"md"}
                            size={"md"}
                            center>
                            <ScrollArea.Autosize mah={"80vh"} type={"hover"}>
                                <ProjectItem canEdit={false}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={true}/>
                                <ProjectItem canEdit={false}/>

                            </ScrollArea.Autosize>
                        </List>
                    </AppShell.Section>
                </AppShell.Aside>
                <AppShell.Main>
                    <Router/>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
