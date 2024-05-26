import {ColorSchemeToggle} from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import {HeroText} from "@/components/HeroText/HeroText";
import graphWeaveLogo from "@/logo.svg";
import {AspectRatio, Center, ScrollArea, Space, Stack} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";

export function HomePage() {


    return (
        <>
            <Center>
                <Stack
                    h={"calc(90vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"}
                    align={"stretch"}
                    justify={"space-evenly"}>
                    <AspectRatio maw={300} style={{margin: "auto"}}>
                        <img src={graphWeaveLogo} alt={"Logo"}/>
                    </AspectRatio>
                    <HeroText/>
                </Stack>
            </Center>
        </>
    );
}
