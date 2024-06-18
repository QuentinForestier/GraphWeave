import React, {createContext, useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {ProjectsContext} from "@/contexts/ProjectsContext";
import {getProjectsOfUser} from "@/api/requests/projects";
import {Project} from "@/models/Project";
import {useParams} from "react-router-dom";
import {Entity} from "@/models/uml/Entity";
import {Client, messageCallbackType} from "@stomp/stompjs";
import {ChatMessage} from "@/models/ChatMessage";

type AppContextType = {
    addEntity: (entity: Entity, type: String) => void
    subscribeToUmlUpdate: (callback: any) => void
    subscribeToChat: (callback: any) => void
    subscribeToError: (callback: any) => void
    sendChatMessage: (message: ChatMessage) => void
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({children}: { children: React.ReactNode }) => {
    const {token} = useAuth();
    const {id} = useParams();

    let stompClient: Client;

    useEffect(() => {
        stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });

        stompClient.activate();
    }, [id, token])


    const addEntity = (entity: Entity, type: String) => {
        stompClient.publish({
            destination: `/app/projects/${id}/uml/create/entity/${type}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(entity)
        });
    }

    const removeEntity = (entity: Entity, type: String) => {
        stompClient.publish({
            destination: `/app/projects/${id}/uml/delete/entity/${type}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(entity)
        });
    }

    const updateEntity = (entity: Entity, type: String) => {
        stompClient.publish({
            destination: `/app/projects/${id}/uml/update/entity/${type}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(entity)
        })
    }

    const sendChatMessage = (message: ChatMessage) => {
        stompClient.publish({
            destination: `/app/projects/${id}/chat/send`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(message)
        })
    }

    const subscribeToUmlUpdate = (callback: any) => {
        stompClient.subscribe(`/user/topic/${id}/uml-update`, callback);
    }

    const subscribeToChat = (callback: any) => {
        stompClient.subscribe(`/topic/${id}/chat`, callback);
    }

    const subscribeToError = (callback: any) => {
        stompClient.subscribe(`/user/topic/${id}/error`, callback);
    }




    return (
        <AppContext.Provider value={{
            addEntity,
            subscribeToUmlUpdate,
            subscribeToChat,
            subscribeToError,
            sendChatMessage
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider, AppContext};