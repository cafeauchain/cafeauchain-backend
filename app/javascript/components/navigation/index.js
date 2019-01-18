import React, { Component, Fragment as F } from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import NavBar from "./responsiveNavbar";

import authorized from "./links/auth";
import base from "./links/base";
import "./nav.scss";

class Nav extends Component {
    constructor(props) {
        super(props);
        //eslint-disable-next-line
        console.log(props);
        const { loggedIn } = props;
        this.state = {
            links: loggedIn ? authorized : base
        };
    }

    render() {
        const { links } = this.state;
        return (
            <F>
                <NavBar leftItems={links.left} rightItems={links.right} />
                <div className="navbar-spacer" style={{ marginTop: "68px" }} />
                <Container style={{ height: 100, background: "white" }}>This is some spacer content</Container>
            </F>
        );
    }
}

const { bool } = PropTypes;
Nav.propTypes = {
    loggedIn: bool.isRequired
};

export default Nav;
