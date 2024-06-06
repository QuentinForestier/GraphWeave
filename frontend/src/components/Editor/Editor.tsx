import React, {useState, useRef, useCallback} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {EditorToolbar} from "./EditorToolbar";
import { v4 as uuidv4 } from 'uuid';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: {label: 'input node'},
        position: {x: 250, y: 5},
    },
];

export function Editor() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const wrapperBounds = reactFlowWrapper.current.getBoundingClientRect();
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX - wrapperBounds.left,
                y: event.clientY - wrapperBounds.top,
            });

            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: {label: `${type} node`},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    return (
        <ReactFlowProvider>
            <div ref={reactFlowWrapper} style={{ height: 600 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
            <EditorToolbar />
        </ReactFlowProvider>
    );
};
