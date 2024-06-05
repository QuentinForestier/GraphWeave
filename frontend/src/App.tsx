import '@mantine/core/styles.css';
import {
    AppShell,
    Divider,
    MantineProvider,
    ScrollArea,
} from '@mantine/core';
import {theme} from './theme';
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import {Header} from './components/Header/Header';
import {SearchAddInput} from "@/components/SearchAddInput/SearchAddInput";
import {ProjectListItem} from "@/components/Projects/ProjectListItem";
import {Notifications} from "@mantine/notifications";
import {modals, ModalsProvider} from "@mantine/modals";
import {ProjectModal} from "@/components/Projects/ProjectModal";

import Routes from "@/routes";
import {AuthProvider} from "@/contexts/AuthContext";
import {ProjectList} from "@/components/Projects/ProjectList";
import {ProjectsProvider} from "@/contexts/ProjectsContext";
import {Client} from "@stomp/stompjs";
import {StompProvider} from "usestomp-hook/lib";


export default function App() {
    const [opened, {toggle}] = useDisclosure(false);


    return (
        <MantineProvider theme={theme}>
            <AuthProvider>
                <ProjectsProvider>
                    <ModalsProvider>
                        <Notifications/>
                        <ProjectList opened={opened} toggle={toggle}/>
                        <AppShell
                            padding={{base: 10, sm: 15, lg: 'xl'}}
                            header={
                                {height: {base: 65, sm: 78, lg: 90}}}
                        >
                            <AppShell.Header
                                withBorder={false}>
                                <Header openedAside={opened} onAsideToggle={toggle}/>
                            </AppShell.Header>
                            <AppShell.Main>
                                <Routes toggle={toggle}/>
                            </AppShell.Main>
                        </AppShell>
                    </ModalsProvider>
                </ProjectsProvider>
            </AuthProvider>
        </MantineProvider>
    );
}
