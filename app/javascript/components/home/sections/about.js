import React from "react";
import { Grid, Header, Image } from "semantic-ui-react";

import img from "../../../../assets/images/coffee-imgs/coffee-img-31.jpg";

const About = () => {
    return (
        <Grid divided columns="equal" stackable container>
            <Grid.Row textAlign="center">
                <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        What a Company
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>That is what they all say about us</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        I shouldnt have gone with their competitor.
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        <Image avatar src={img} />
                        <span>
                            <b>Nan</b>
                        </span>
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default About;
