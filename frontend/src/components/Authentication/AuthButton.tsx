import {IconLogout, IconUserQuestion} from "@tabler/icons-react";
import {ActionIcon, Group} from "@mantine/core";
import React from "react";

import {useAuth} from "@/hooks/useAuth";
import {openAuthModals} from "@/helpers/ModalsHelper";


export function AuthButton() {

    const {token, logout} = useAuth();

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() => {
                    if (!token) {
                        openAuthModals();
                    } else {
                        logout();
                        window.location.reload();
                    }
                }}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                {token ? (
                        <IconLogout/>
                    ) :
                    <IconUserQuestion/>

                }
            </ActionIcon>
        </Group>
    );
}