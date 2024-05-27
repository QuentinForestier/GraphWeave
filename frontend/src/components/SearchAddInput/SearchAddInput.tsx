import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import {IconSearch, IconArrowRight, IconPlus} from '@tabler/icons-react';

export function SearchAddInput(props: TextInputProps) {
    const theme = useMantineTheme();

    return (
        <TextInput
            radius="md"
            size="md"
            placeholder="Search projects"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
                <ActionIcon size={32} radius="xl"  variant="filled">
                    <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
            {...props}
        />
    );
}