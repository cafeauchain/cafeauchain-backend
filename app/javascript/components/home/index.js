import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Responsive, Segment, Visibility } from "semantic-ui-react";

import Hero from "./sections/hero";
import General from "./sections/general";
import About from "./sections/about";
import Features from "./sections/features";

import Fees from "../shared/feeCalc/index";

import "./styles.scss";
// eslint-disable-next-line
import bg from "images/bg-1.jpg";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
const HomepageHeading = ({ mobile }) => (
    <Container text style={{ padding: "3em 0" }}>
        <Hero mobile={mobile} />
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
};

class DesktopContainer extends Component {
    state = {};

    render() {
        const { children } = this.props;

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ padding: "1em 0em", backgroundImage: `url(${bg})` }}
                        className="full-width home-hero"
                        vertical
                    >
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
};

// class MobileContainer extends Component {
//     state = {};
//
//     handleSidebarHide = () => this.setState({ sidebarOpened: false });
//
//     handleToggle = () => this.setState({ sidebarOpened: true });
//
//     render() {
//         const { children } = this.props;
//         const { sidebarOpened } = this.state;
//
//         return (
//             <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
//                 <Sidebar
//                     as={Menu}
//                     animation="push"
//                     inverted
//                     onHide={this.handleSidebarHide}
//                     vertical
//                     visible={sidebarOpened}
//                 >
//                     <Menu.Item as="a" active>
//                         Home
//                     </Menu.Item>
//                     <Menu.Item as="a">Work</Menu.Item>
//                     <Menu.Item as="a">Company</Menu.Item>
//                     <Menu.Item as="a">Careers</Menu.Item>
//                     <Menu.Item as="a">Log in</Menu.Item>
//                     <Menu.Item as="a">Sign Up</Menu.Item>
//                 </Sidebar>
//
//                 <Sidebar.Pusher dimmed={sidebarOpened}>
//                     <Segment inverted textAlign="center" style={{ minHeight: 350, padding: "1em 0em" }} vertical>
//                         <Container>
//                             <Menu inverted pointing secondary size="large">
//                                 <Menu.Item onClick={this.handleToggle}>
//                                     <Icon name="sidebar" />
//                                 </Menu.Item>
//                                 <Menu.Item position="right">
//                                     <Button as="a" inverted>
//                                         Log in
//                                     </Button>
//                                     <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
//                                         Sign Up
//                                     </Button>
//                                 </Menu.Item>
//                             </Menu>
//                         </Container>
//                         <HomepageHeading mobile />
//                     </Segment>
//
//                     {children}
//                 </Sidebar.Pusher>
//             </Responsive>
//         );
//     }
// }
//
// MobileContainer.propTypes = {
//     children: PropTypes.node
// };

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        {/*<MobileContainer>{children}</MobileContainer>*/}
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node
};

const HomepageLayout = () => (
    <ResponsiveContainer>
        <Segment vertical as="section">
            <Fees />
        </Segment>
        <Segment vertical as="section">
            <General />
        </Segment>

        <Segment vertical as="section">
            <About />
        </Segment>

        <Segment vertical as="section">
            <Features />
        </Segment>
        {/* Repeating for example of alternating sections */}
        <Segment vertical as="section">
            <General />
        </Segment>

        <Segment vertical as="section">
            <About />
        </Segment>

        <Segment vertical as="section">
            <Features />
        </Segment>
    </ResponsiveContainer>
);

export default HomepageLayout;
