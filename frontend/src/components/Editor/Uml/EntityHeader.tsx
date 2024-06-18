import {Center, InputWrapper, Text, TextInput, Title} from "@mantine/core";
import React, {useState} from "react";

type EntityHeaderProps = {
    tags?: string,
    name: string,
}

export function EntityHeader(props: EntityHeaderProps) {
    return (
        <>
            {props.tags && <Center>{"<< " + props.tags + " >>"}</Center>}

            <TextInput
                value={props.name}
                variant="unstyled"
                styles={{
                    input: {
                        fontSize:'1rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }
                }}/>
        </>
    );
}