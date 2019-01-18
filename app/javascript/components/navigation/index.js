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
        console.log(props);
        const { loggedIn } = props;
        this.state = {
            links: loggedIn ? authorized : base
        };
    }

    render() {
        const { links } = this.state;
        return <NavBar leftItems={links.left} rightItems={links.right} />;
    }
}

const { bool } = PropTypes;
Nav.propTypes = {
    loggedIn: bool.isRequired
};

export default Nav;
