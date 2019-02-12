import React from "react";
import { Grid, Header, Image } from "semantic-ui-react";
// eslint-disable-next-line
import img from "images/coffee-imgs/coffee-img-31.jpg";

const About = () => {
    return (
        <Grid divided columns="equal" stackable container>
            <Grid.Row textAlign="center">
                <Grid.Column verticalAlign="middle" style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        Show Where Your Coffee Comes From
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        You spend time developing relationships with coffee producers.
                        Let your customers know more about them.
                    </p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <p style={{ fontSize: "1.33em" }}>
                        <Image src={img} />
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default About;
