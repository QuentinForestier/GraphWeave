import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from '../Dots/Dots';
import classes from './HeroText.module.css';

export function HeroText() {
    return (

        <Container className={classes.wrapper} >
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />




            <div className={classes.inner}>
                <Title className={classes.title}>
                    Create, Collaborate and Conquer Diagrams Together!
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        Experience seamless teamwork and intuitive design with GraphWeave, the ultimate tool for collaborative UML class diagrams. Join now and transform your ideas into reality effortlessly!
                    </Text>
                </Container>

                <div className={classes.controls}>

                    <Button variant={"outline"}   className={classes.control} size="lg">
                        Start Now !
                    </Button>
                </div>
            </div>
        </Container>
    );
}