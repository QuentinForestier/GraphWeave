import {ColorSchemeToggle} from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import {HeroText} from "@/components/HeroText/HeroText";
import graphWeaveLogo from "@/logo.svg";
import {AspectRatio, Center, Stack} from "@mantine/core";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {openAuthModals} from "@/helpers/ModalsHelper";
import {useAuth} from "@/hooks/useAuth";

type HomePageProps ={
    toggle: () => void
}

export function HomePage({toggle}:HomePageProps) {

    const {pathname} = useLocation();
    const {authenticatedUser} = useAuth();

    useEffect(() => {
        if(pathname==='/login' && !authenticatedUser){
            openAuthModals();
        }
    })

    return (
        <>
            <Center >
                <Stack
                    h={"calc(90vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"}
                    align={"stretch"}
                    justify={"space-evenly"}>
                    <AspectRatio maw={300} style={{margin: "auto"}}>
                        <img src={graphWeaveLogo} alt={"Logo"}/>
                    </AspectRatio>
                    <HeroText toggle={toggle}/>
                </Stack>
            </Center>
        </>
    );
}
