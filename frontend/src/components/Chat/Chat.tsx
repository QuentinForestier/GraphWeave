import {
    ActionIcon, Affix,
    Avatar,
    Button,
    Dialog,
    Divider,
    Group, Indicator,
    rem,
    ScrollArea,
    Space,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconMessage, IconMessageChatbot, IconPlus, IconSend} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import {Message} from "@/components/Chat/Message";
import {useApp} from "@/hooks/useApp";
import {IMessage} from "@stomp/stompjs";
import {useAuth} from "@/hooks/useAuth";
import {ChatMessage} from "@/models/ChatMessage";

export function Chat() {

    const [opened, {open, close}] = useDisclosure(false);

    const [messages, setMessages] = useState([] as ChatMessage[]);

    const [inputValue, setInputValue] = useState("");

    const {subscribeToChat, sendChatMessage, loading} = useApp();

    const [indicatorVisible, setIndicatorVisible] = useState<boolean>(false);


    useEffect(() => {
        if (!loading) {
            subscribeToChat((message: IMessage) => {
                setMessages(prev => [...prev, JSON.parse(message.body)]);
                setInputValue("");
                setIndicatorVisible(true)
            })
        }
    }, [loading])

    return <>

        <Affix hidden={opened} position={{bottom: 40, right: 40}}>
            <Indicator disabled={!indicatorVisible}>
                <ActionIcon radius={"xl"} size={"xl"} onClick={() => {
                    open();
                    setIndicatorVisible(false);
                }}><IconMessage/></ActionIcon>
            </Indicator>
        </Affix>

        <Dialog withBorder shadow={"sm"}
                transitionProps={{
                    transition: 'pop-bottom-right'
                }}
                opened={opened} withCloseButton onClose={() => {
            close();
            setIndicatorVisible(false);
        }
        } size="lg" radius="md">
            <Title mb="sm" order={3}>Chat messages</Title>

            <ScrollArea h={350} mb="xs" fw={500}>

                {
                    messages.map((m, i) => {
                        return <Message key={i} message={m}/>
                    })
                }
            </ScrollArea>

            <Group align="flex-end">
                <TextInput
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    rightSection={
                        <ActionIcon
                            onClick={() => {
                                sendChatMessage({
                                    message: inputValue,
                                })
                            }}
                            size={"lg"}
                            variant="filled">
                            <IconSend style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                    }
                    placeholder="Type here to chat with the team" style={{flex: 1}}/>

            </Group>
        </Dialog>
    </>
}