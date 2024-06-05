import {Button, TextInput, Title} from '@mantine/core';
import {Client} from '@stomp/stompjs'
import {Text} from "@mantine/core";
import {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useLocation, useParams} from "react-router-dom";


export function ProjectPage() {

    const {token, authenticatedUser} = useAuth();

    const {id} = useParams();

    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        onConnect: (frame) => {
            console.log(frame);
            stompClient.subscribe('/user/topic/project-updates/'+id, (messages) => {
                let chatmessage = JSON.parse(messages.body);
                console.log(chatmessage)
            }, {
                Authorization: `Bearer ${token}`,
            });
        },
        connectHeaders: {
            Authorization: `Bearer ${token}`,
        }
    });


    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();

    return (
        <>
            <Title>Project</Title>
            <Button onClick={() =>
                stompClient.publish({
                    destination: "/app/projects/"+id,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({from: 'dudude', text: "stp fonctionne"})
                })
            }>
                Send
            </Button>
        </>
    );
}
