import {Entity} from "@/models/uml/Entity";
import {IMessage} from "@stomp/stompjs";
import {NodeChange} from "reactflow";

export function createNode(message: IMessage, setNodes) {
    let entity: Entity = JSON.parse(message.body);
    const node = {
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
    setNodes((nds) => nds.concat(node));
}


export function updateNode(message: IMessage, setNodes) {

    let entity: Entity = JSON.parse(message.body);
    setNodes((nds) => nds.map(node => {
        if(node.id !== entity.id) return node;
        if (entity.graphics?.x && entity.graphics?.y) {
            node.position = {
                x: entity.graphics?.x,
                y: entity.graphics?.y,
            }
        }
        if (entity.graphics?.width && entity.graphics?.height) {
            node.style = {
                ...node.style,
                width: entity.graphics?.width,
                height: entity.graphics?.height,
            }
        }
        return node;
    }));
}


export function deleteNode(message: IMessage, setNodes) {
    let entity: Entity = JSON.parse(message.body);
    setNodes((nds) => nds.filter(node => node.id !== entity.id));
}

enum UpdateType {
    DIMENSIONS = "dimensions",
    POSITION = "position",
}


export function onNodesUpdate(change: NodeChange, node) {
    switch (change.type) {
        case UpdateType.DIMENSIONS:
            return updateNodeDimensionObject(change, node);
        case UpdateType.POSITION:
            return updateNodePositionObject(change, node)
    }
}

function updateNodePositionObject(change: NodeChange, node) {
    if (change.dragging !== false && (change.position.x !== node.position.x || change.position.y !== node.position.y)) {
        return {
            id: change.id,
            graphics: {
                x: change.position.x,
                y: change.position.y,
            }
        }
    }
    return undefined;
}

function updateNodeDimensionObject(change: NodeChange, node) {
    if (change.resizing !== false && (node.style.height !== change.dimensions.height || node.style.width !== change.dimensions.width)) {
        return {
            id: change.id,
            graphics: {
                width: change.dimensions.width,
                height: change.dimensions.height,
            }
        }
    } else {
        return undefined;
    }
}

