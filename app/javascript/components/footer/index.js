import React from "react";
import PropTypes from "prop-types";
import { Segment, Container, Grid, Header, List, Image, Divider } from "semantic-ui-react";
// eslint-disable-next-line
import logo from "images/cac-unofficial-logo.png";

const Footer = ({ loggedIn }) => {
    return (
        <Segment inverted style={{ padding: "3em 0em", background: "#3a3a3a" }} vertical>
            <Container textAlign="center">
                {!loggedIn && (
                    <React.Fragment>
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
                                        <List.Item as="a" href="/login">
                                            Login
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header inverted as="h4" content="Cafe au Chain | Proof of Perk" />
                                    <p>
                                        Blockchain-backed roaster management tools for Roasters that want to make an
                                        impact.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider inverted section />
                    </React.Fragment>
                )}

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
Footer.propTypes = {
    loggedIn: PropTypes.bool
};

export default Footer;
