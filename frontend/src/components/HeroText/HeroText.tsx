import {Title, Text, Button, Container} from '@mantine/core';
import {Dots} from '../Dots/Dots';
import classes from './HeroText.module.css';
import {notifications} from "@mantine/notifications";
import {useContext} from "react";
import {modals} from "@mantine/modals";
import {useAuth} from "@/hooks/useAuth";
import {openAuthModals} from "@/helpers/ModalsHelper";

type HeroTextProps = {
    toggle:() => void
}

export function HeroText({toggle} : HeroTextProps) {

    const {authenticatedUser} = useAuth();

    return (

        <Container className={classes.wrapper}>
            <Dots className={classes.dots} style={{left: 0, top: 0}}/>
            <Dots className={classes.dots} style={{left: 60, top: 0}}/>
            <Dots className={classes.dots} style={{left: 0, top: 140}}/>
            <Dots className={classes.dots} style={{right: 0, top: 60}}/>


            <div className={classes.inner}>
                <Title className={classes.title}>
                    Weave, Collaborate, and Conquer Diagrams Together!
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        Embark on a seamless teamwork journey and intuitive design with GraphWeave, where each
                        collaboration thread intertwines to create perfect UML-class diagrams. Join us now and let your
                        ideas come to life effortlessly!
                    </Text>
                </Container>

                <div className={classes.controls}>

                    <Button variant={"outline"} onClick={() => {
                        if(authenticatedUser) {
                            toggle();
                        }else {
                            openAuthModals();
                        }
                    }} className={classes.control} size="lg">
                        Start Now !
                    </Button>
                </div>
            </div>
        </Container>
    );
}