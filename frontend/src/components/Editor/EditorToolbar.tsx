import React from 'react';
import {Group, Center} from '@mantine/core';
import {ClassIcon} from '@/assets/icons';

export function EditorToolbar() {

    const customStyle = {
        position: 'absolute',
        top: 130,
        backgroundColor: 'gray',
        zIndex: 10,
        padding: '4px',
    }

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };


    return (

        <Center>
            <Group style={{...customStyle}}>
                <div
                    onDragStart={(event) => onDragStart(event, "input")}
                    draggable
                >
                    <img src={ClassIcon} width={30}/>
                </div>
                <div
                    onDragStart={(event) => onDragStart(event, "default")}
                    draggable
                >
                    Default Node
                </div>
                <div
                    onDragStart={(event) => onDragStart(event, "output")}
                    draggable
                >
                    Output Node
                </div>
            </Group>
        </Center>
    );
}