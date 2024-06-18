import {Button, Dialog, Group, TextInput, Text} from '@mantine/core';
import {useApp} from "@/hooks/useApp";
import {useDisclosure} from "@mantine/hooks";
import {Chat} from "@/components/Chat/Chat";


export function ProjectPage() {

    const {addEntity} = useApp();



    return (
        <>
           <Chat/>
        </>
    );
}
