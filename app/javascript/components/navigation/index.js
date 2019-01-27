// TODO: Add roaster profile slug for links, and user role for conditional links
import React, { Component } from "react";
import PropTypes from "prop-types";

import NavBar from "./responsiveNavbar";

import authorized from "./links/auth";
import base from "./links/base";
import "./nav.scss";

class Nav extends Component {
    constructor(props) {
        super(props);
        //eslint-disable-next-line
        const { loggedIn, user } = props;
        this.state = {
            links: loggedIn ? authorized(user) : base
        };
    }

    render() {
        const { links } = this.state;
        return <NavBar leftItems={links.left} rightItems={links.right} buttons={links.buttons} />;
    }
}

const { bool, object } = PropTypes;
Nav.propTypes = {
    loggedIn: bool.isRequired,
    user: object
};

export default Nav;