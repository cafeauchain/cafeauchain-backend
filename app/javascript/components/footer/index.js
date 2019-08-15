import React from "react";
import PropTypes from "prop-types";
import { Segment, Container, Header, List, Image, Divider } from "semantic-ui-react";
/* eslint-disable */
import logo from "images/cac-unofficial-logo.png";
import Flex from "shared/flex";
/* eslint-enable */

const Footer = ({ loggedIn }) => {
    return (
        <Segment
            inverted={!loggedIn}
            style={{ padding: "1em 0em", background: loggedIn ? "#ffffff" : "#3a3a3a" }}
            vertical
        >
            <Container textAlign="center">
                {!loggedIn && (
                    <React.Fragment>
                        <div style={{ margin: "20px 0", position: "relative" }}>
                            <Flex spacing="20" wrap centermain>
                                <div flex="50" className="footer-nav">
                                    <Flex column centermain className="footer-nav-inner">
                                        <List horizontal link inverted>
                                            <List.Item as="a" href="/">
                                                    Home
                                            </List.Item>
                                            <List.Item as="a" href="http://www.cafeauchain.com/blog/about">
                                                    About
                                            </List.Item>
                                            <List.Item as="a" href="/contact">
                                                    Contact
                                            </List.Item>
                                            <List.Item as="a" href="http://www.cafeauchain.com/blog">
                                                Blog
                                            </List.Item>
                                            <List.Item as="a" href="/login">
                                                    Login
                                            </List.Item>
                                        </List>
                                    </Flex>

                                </div>
                                <div flex="50" className="footer-tag">
                                    <Header inverted as="h4" content="Cafe au Chain" />
                                    <p>
                                        Tools for roasters, all in one place.
                                    </p>
                                </div>
                            </Flex>
                        </div>

                        <Divider inverted section />
                    </React.Fragment>
                )}

                <Image src={logo} centered size="mini" />
                <p className="small-text poweredby">Powered by Cafe au Chain</p>
                {false && (
                    <List horizontal inverted={!loggedIn} divided link size="small">
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
                )}

            </Container>
        </Segment>
    );
};
Footer.propTypes = {
    loggedIn: PropTypes.bool
};

export default Footer;
