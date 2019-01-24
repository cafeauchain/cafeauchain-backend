import React from "react";
import { Grid, Header, Image, Button } from "semantic-ui-react";
// eslint-disable-next-line
import img from "images/coffee-imgs/coffee-img-23.jpg";

const General = () => {
    return (
        <Grid container stackable verticalAlign="middle">
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        We Help Companies and Companions
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        We can give your company superpowers to do things that they never thought possible. Let us
                        delight your customers and empower your needs... through pure data analytics.
                    </p>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        We Make Bananas That Can Dance
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        Yes thats right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
                    </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                    <Image bordered rounded size="large" src={img} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Button size="huge">Check Them Out</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default General;
