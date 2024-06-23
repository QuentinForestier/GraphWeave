import {TextInput} from "@mantine/core";
import React from "react";

export function Attribute() {
    return (
        <>
            <input type={"text"}
                   style={{
                       paddingLeft:'0.3rem',
                       width:'100%',
                       border:"none",
                       outline:"none",
                       background:"none",
                       color:"black",
                       textOverflow:'ellipsis'
                   }}
            />
        </>
    );
}