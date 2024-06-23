import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    SelectionMode, Panel,
    NodeChange
} from 'reactflow';
import 'reactflow/dist/style.css';

import {EditorToolbar} from "./EditorToolbar";
import {v4 as uuidv4} from 'uuid';
import {useApp} from "@/hooks/useApp";
import {ClassNode, EnumNode} from "@/components/Editor/Uml/EntityNodes";
import {IMessage} from "@stomp/stompjs";
import {ChatMessage} from "@/models/ChatMessage";
import {Entity} from "@/models/uml/Entity";


export function Editor() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const nodeTypes = useMemo(() => ({Class: ClassNode, Enum:EnumNode}), [])

    const {loading, addEntity, subscribeToEntityCreation} = useApp();

    const customOnNodesChange = (changes: NodeChange[]) => {
        onNodesChange(changes);
    }

    useEffect(() => {
        if (!loading) {
            subscribeToEntityCreation((message: IMessage) => {
                let entity: Entity = JSON.parse(message.body);
                const newNode = {
                    id: entity.id,
                    type: entity.type,
                    position: {x: entity.graphics?.x, y: entity.graphics?.y},
                    data: entity,
                    style: {
                        background: '#fff7e1',
                        fontSize: 12,
                        border: '1px solid black',
                        fontColor: 'black',
                        width: entity.graphics?.width,
                    },

                };

                setNodes((nds) => nds.concat(newNode));
            })
        }
    }, [loading])

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
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });


            addEntity({
                name: type,
                graphics: {
                    width: 150,
                    x: position.x,
                    y: position.y,
                }
            }, type);


        },
        [reactFlowInstance],
    );

    return (
        <ReactFlowProvider>
            <div ref={reactFlowWrapper} style={{height: '90vh'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={customOnNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}

                >
                    <Background/>
                    <Controls/>
                </ReactFlow>
            </div>
            <EditorToolbar/>
        </ReactFlowProvider>
    );
};