import React, {createContext, useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {ProjectsContext} from "@/contexts/ProjectsContext";
import {getProjectsOfUser} from "@/api/requests/projects";
import {Project} from "@/models/Project";
import {useParams} from "react-router-dom";
import {Entity} from "@/models/uml/Entity";
import {Client} from "@stomp/stompjs";
import {ChatMessage} from "@/models/ChatMessage";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

type AppContextType = {
    loading: boolean;
    addEntity: (entity: Entity, type: String) => void
    updateEntity: (entity: Entity, type: String) => void
    removeEntity: (entity: Entity, type: String) => void
    subscribeToEntityCreation: (callback: any) => void
    subscribeToEntityUpdate: (callback: any) => void
    subscribeToEntityDeletion: (callback: any) => void
    subscribeToChat: (callback: any) => void
    subscribeToError: (callback: any) => void
    sendChatMessage: (message: ChatMessage) => void
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({children}: { children: React.ReactNode }) => {
    const {token} = useAuth();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        let client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () =>{
                setLoading(false);
            }
        });

        client.activate();

        setStompClient(client);


    }, [id, token])


    ////////////////// Entity //////////////////////////

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

    const subscribeToEntityCreation = (callback: any) => {
        stompClient.subscribe(`/topic/${id}/create/entity`, callback);
    }

    const subscribeToEntityUpdate = (callback: any) => {
        stompClient.subscribe(`/topic/${id}/update/entity`, callback);
    }
    const subscribeToEntityDeletion = (callback: any) => {
        stompClient.subscribe(`/topic/${id}/delete/entity`, callback);
    }


    ////////////////////// CHAT ////////////////////////

    const sendChatMessage = (message: ChatMessage) => {
        stompClient.publish({
            destination: `/app/projects/${id}/chat/send`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(message)
        })
    }

    const subscribeToChat = (callback: any) => {
        stompClient.subscribe(`/topic/${id}/chat`, callback);
    }

    ////////////////////// OTHER ///////////////////////////////////

    const subscribeToError = (callback: any) => {
        stompClient.subscribe(`/user/topic/${id}/error`, callback);
    }


    return (
        <AppContext.Provider value={{
            loading,
            addEntity,
            updateEntity,
            removeEntity,
            subscribeToEntityCreation,
            subscribeToEntityDeletion,
            subscribeToEntityUpdate,
            subscribeToChat,
            subscribeToError,
            sendChatMessage
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider, AppContext};