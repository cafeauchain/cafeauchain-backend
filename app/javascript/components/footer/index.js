import React from "react";
import { Segment, Container, Grid, Header, List, Image, Divider } from "semantic-ui-react";
import logo from "../../../assets/images/cac-unofficial-logo.png";

const Footer = () => {
    return (
        <Segment inverted style={{ padding: "3em 0em", background: "#3a3a3a" }} vertical>
            <Container textAlign="center">
                <Grid columns={2} divided stackable inverted>
                    <Grid.Row>
                        <Grid.Column>
                            <Header inverted as="h4" content="Navigation" />
                            <List link inverted>
                                <List.Item as="a" href="/">
                                    Home
                                </List.Item>
                                <List.Item as="a" href="/about">
                                    About
                                </List.Item>
                                <List.Item as="a" href="/contact">
                                    Contact
                                </List.Item>
                                <List.Item as="a" href="/users/sign_in">
                                    Login
                                </List.Item>
                            </List>
                        </Grid.Column>
                        {/*
                            <Grid.Column>
                            <Header inverted as="h4" content="Group 2" />
                            <List link inverted>
                                <List.Item as="a">Link One</List.Item>
                                <List.Item as="a">Link Two</List.Item>
                                <List.Item as="a">Link Three</List.Item>
                                <List.Item as="a">Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header inverted as="h4" content="Group 3" />
                            <List link inverted>
                                <List.Item as="a">Link One</List.Item>
                                <List.Item as="a">Link Two</List.Item>
                                <List.Item as="a">Link Three</List.Item>
                                <List.Item as="a">Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        */}
                        <Grid.Column>
                            <Header inverted as="h4" content="Cafe au Chain | Proof of Perk" />
                            <p>Blockchain-backed roaster management tools for Roasters that want to make an impact.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider inverted section />
                <Image src={logo} centered size="mini" />
                <List horizontal inverted divided link size="small">
                    <List.Item as="a" href="/site-map">
                        Site Map
                    </List.Item>
                    <List.Item as="a" href="/terms">
                        Terms and Conditions
                    </List.Item>
                    <List.Item as="a" href="/privacy">
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    );
};

export default Footer;
