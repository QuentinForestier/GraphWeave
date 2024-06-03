import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import {IconSearch,  IconPlus} from '@tabler/icons-react';
import React, {MouseEventHandler} from "react";

interface SearchAddInputProps extends TextInputProps {
    onAddClick?: MouseEventHandler<HTMLButtonElement>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const defaultProps: Partial<SearchAddInputProps> = {
    onAddClick: undefined,
    onChange: undefined,
}

export function SearchAddInput(props: SearchAddInputProps) {
    const theme = useMantineTheme();

    return (
        <TextInput
            value={props.value}
            radius="md"
            size="md"
            onChange={props.onChange}
            placeholder={props.placeholder}
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
                <ActionIcon onClick={props.onAddClick} size={32} radius="xl"  variant="filled">
                    <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
        />
    );
}