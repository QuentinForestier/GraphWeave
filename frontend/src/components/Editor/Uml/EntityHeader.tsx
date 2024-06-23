import {Center, InputWrapper, Text, TextInput, Title} from "@mantine/core";
import React, {useState} from "react";

type EntityHeaderProps = {
    tags?: string,
    name: string,
}

export function EntityHeader(props: EntityHeaderProps) {
    return (
        <>
            {props.tags && <input type={"text"}
                                  readOnly={true}
                                  value={"<< " + props.tags + " >>"}
                                  style={{
                                      textOverflow: 'ellipsis',
                                      width: "100%",
                                      margin: 'auto',
                                      padding: "0",
                                      textAlign: 'center',
                                      border: "none",
                                      outline: "none",
                                      background: "none",
                                      color: "black",

                                  }}></input>}

            <input type={"text"}

                   style={{
                       textOverflow: 'ellipsis',
                       width: "100%",
                       margin: 'auto',
                       textAlign: 'center',
                       fontWeight: 'bold',
                       fontSize: '0.8rem',
                       border: "none",
                       outline: "none",
                       background: "none",
                       color: "black",
                   }}/>
        </>
    )
        ;
}