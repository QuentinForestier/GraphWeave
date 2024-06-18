import ReactFlow, {Controls, MiniMap, Background, applyNodeChanges, applyEdgeChanges, EdgeChange, NodeChange} from 'reactflow';
import 'reactflow/dist/style.css';
import {useCallback, useMemo, useState} from "react";
import {ClassNode} from "@/components/Editor/Uml/ClassNode";


const initialEdges = [{id: '1-2', source: '1', target: '2', label: 'to the', type: 'step'}];

const initialNodes = [
    {
        id: '1',
        data: {label: 'Hello'},
        position: {x: 0, y: 0},
        type: 'input',
    },
    {
        id: '2',
        data: {label: 'World'},
        position: {x: 100, y: 100},
        type: 'classNode'
    },
];
const nodeClassName = (node: { type: any; }) => node.type;


export function Editor() {

    const nodeTypes = useMemo(() => ({classNode: ClassNode}), []);

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    return (
        <div style={{height: '84vh'}}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={nodeTypes}
            >
                <MiniMap zoomable pannable nodeClassName={nodeClassName}/>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}