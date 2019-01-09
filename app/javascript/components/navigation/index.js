import React, { Component, Fragment as F } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./responsiveNavbar";

import links from "./navlinks";
import "./nav.scss";

class Nav extends Component {
    constructor(props) {
        super(props);
        //eslint-disable-next-line
        console.log(props);
        this.state = {};
    }

    render() {
        return (
            <F>
                <NavBar leftItems={links.left} rightItems={links.right} />
                <Container style={{ height: 1000, background: "white" }}>This is some content</Container>
            </F>
        );
    }
}

export default Nav;
