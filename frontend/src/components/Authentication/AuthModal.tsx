import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Anchor,
    Stack,
} from '@mantine/core';
import {notifications} from "@mantine/notifications";
import {modals} from "@mantine/modals";
import {useAuth} from "@/hooks/useAuth";
import {useProjects} from "@/hooks/useProjects";


export function AuthModal(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',

        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val) ? null : 'Password must be 8 characters, at least one digit, one lowercase, one uppercase, one special character'),
        },
    });

    const {login, register, authenticatedUser} = useAuth();


    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to GraphWeave, {type} with
            </Text>
            {/*
            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />
*/}
            <form onSubmit={form.onSubmit(() => {

                if (type === 'register') {
                    register({
                        email: form.values.email,
                        username: form.values.username,
                        password: form.values.password,
                        confirmPassword: form.values.confirmPassword,
                    }).then((response) => {
                            setTimeout(() => {
                                notifications.show({
                                    title: "Welcome to GraphWeave !",
                                    message: "You successfully signed up. Welcome on board " + response.username,
                                })
                            }, 100);
                        }
                    )
                } else {
                    login({
                        email: form.values.email,
                        password: form.values.password,
                    }).then((response) => {

                        notifications.show({
                            title: "Welcome back !",
                            message: "We are happy to see you again, " + response.username,
                        })
                    });
                }
                modals.closeAll();
            })}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            required
                            label="Username"
                            placeholder="Your username"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@graphweave.ch"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password must be 8 characters, at least one digit, one lowercase, one uppercase, one special character'}
                        radius="md"
                    />
                    {type === 'register' && (
                        <PasswordInput
                            required
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={form.values.confirmPassword}
                            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                            error={form.errors.confirmPassword && 'Passwords do not match'}
                            radius="md"
                        />
                    )}

                    {/*type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )*/}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}