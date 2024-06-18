import {useCallback} from "react";
import {Container, Stack, TextInput, Text, Center, Input, Divider} from '@mantine/core';
import {EntityHeader} from "@/components/Editor/Uml/EntityHeader";
import {Attribute} from "@/components/Editor/Uml/Attribute";


const handleStyle = {left: 10};


export function ClassNode() {

    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <Container style={{
            backgroundColor: '#FFF7E1',
            border: '1px solid black',
            padding: 0
        }}>
            <EntityHeader name={"Test"} />
            <Divider color={"black"}/>
            <Stack gap={0}>
                <Attribute/>
                <Attribute/>
                <Attribute/>
                <Attribute/>
            </Stack>

        </Container>
    );
}