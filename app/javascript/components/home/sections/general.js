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
                    Tools for the coffee industry.
                        <br/>
                    Built for sustainability
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        You care about sustainability. So do we.
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                        We’re building tools to help you track economic and 
                        environmental sustainability through your supply chain. 
                    </p>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        Manage your business, manage your data
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        No one knows your business better than you. Get to know it better.
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                    With the Cafe au Chain platform, see your business data in 
                    the context you need to make better decisions, support your partners, and improve your product. 
                    </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                    <Image bordered rounded size="large" src={img} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Button size="huge">Check Out Our Tools</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default General;
