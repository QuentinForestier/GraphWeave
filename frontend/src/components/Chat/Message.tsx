import {Avatar, Group, Space, Text} from "@mantine/core";
import React from "react";
import {ChatMessage} from "@/models/ChatMessage";

export type MessageProps = {
    message:ChatMessage
}

export function Message({ message }: MessageProps) {
    return <>
            <Group pt={"sm"}>
                <Avatar
                    radius="xl"
                >{message.author.substring(0, 2)}</Avatar>
                <div>
                    <Text size="sm">{message.author}</Text>
                    <Text size="xs" c="dimmed">
                        {message.date}
                    </Text>
                </div>
            </Group>
            <Text pl={54} pb={"sm"} pt="sm" size="sm">
                {message.message}
            </Text>
    </>
}