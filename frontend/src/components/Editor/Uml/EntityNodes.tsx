import {useCallback} from "react";
import {Divider} from '@mantine/core';
import {EntityHeader} from "@/components/Editor/Uml/EntityHeader";
import {Attribute} from "@/components/Editor/Uml/Attribute";
import {NodeResizeControl, NodeResizer, ResizeControlVariant} from "reactflow";

const ResizeControl = <>
    <NodeResizeControl
        minWidth={100}
        position={"right"}
        variant={ResizeControlVariant.Handle}
        style={{background: "grey", border: "none", width: "0.4rem", height: "0.4rem"}}
    />
    <NodeResizeControl
        minWidth={100}
        position={"left"}
        variant={ResizeControlVariant.Handle}
        style={{background: "grey", border: "none", width: "0.4rem", height: "0.4rem"}}
    />
</>

const CustomDivider = <Divider mt={5} color={"black"}/>

export function ClassNode({selected, data}) {
    return (
        <>
            <EntityHeader name={data.name}/>
            {CustomDivider}
            <Attribute/>
            {CustomDivider}
            <Attribute/>
            {selected && (ResizeControl)}
        </>
    );
}

export function EnumNode({selected, data}) {
    return (
        <>
            <EntityHeader name={data.name} tags={data.type}/>
            {CustomDivider}
            <Attribute/>
            {CustomDivider}
            <Attribute/>
            {selected && (ResizeControl)}
        </>
    );
}