import {useApp} from "@/hooks/useApp";
import {Chat} from "@/components/Chat/Chat";
import {Editor} from "@/components/Editor/Editor";
import {Box, Container} from "@mantine/core";


export function ProjectPage() {

    return (
        <>
            <Chat/>
            <Editor/>
        </>
    );
}
