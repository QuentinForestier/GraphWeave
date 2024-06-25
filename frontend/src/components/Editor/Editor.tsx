import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    SelectionMode, Panel,
    NodeChange, MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

import {EditorToolbar} from "./EditorToolbar";
import {useApp} from "@/hooks/useApp";
import {ClassNode, EnumNode} from "@/components/Editor/Uml/EntityNodes";
import {IMessage} from "@stomp/stompjs";
import {createNode, deleteNode, onNodesDelete, onNodesUpdate, updateNode} from "@/api/uml";


export function Editor() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const nodeTypes = useMemo(() => ({Class: ClassNode, Enum: EnumNode}), [])

    const {
        loading,
        addEntity,
        updateEntity,
        removeEntity,
        subscribeToEntityCreation,
        subscribeToEntityUpdate,
        subscribeToEntityDeletion,
    } = useApp();


    const onNodesDelete = (nodes: Node[]) => {
        nodes.map(n => removeEntity({
            id: n.id,
        }, n.type));
    }

    const customOnNodesChange = (changes: NodeChange[]) => {
        changes.map((change) => {
            const node = nodes.filter(n => n.id === change!.id)[0];
            const dto = onNodesUpdate(change, node);
            updateEntity(dto, node.type);
        });
        onNodesChange(changes);
    }

    useEffect(() => {
        if (!loading) {
            subscribeToEntityCreation((message: IMessage) => createNode(message, setNodes));
            subscribeToEntityUpdate((message: IMessage) => updateNode(message, setNodes));
            subscribeToEntityDeletion((message: IMessage) => deleteNode(message, setNodes));
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
                    onNodesDelete={onNodesDelete}
                >
                    <Background/>
                    <Controls/>
                    <MiniMap/>
                </ReactFlow>
            </div>
            <EditorToolbar/>
        </ReactFlowProvider>
    );
};