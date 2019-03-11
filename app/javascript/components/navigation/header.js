import React, { Component } from "react";
import PropTypes from "prop-types";

import NavBar from "./responsiveNavbar";
import base from "./links/base";
import customer from "./links/customer";
import roaster from "./links/roaster";
import "./nav.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        const { cart, userId } = props;
        this.state = {
            links: userId ? (cart ? customer() : roaster()) : base
        };
    }

    render() {
        const {
            links: { right = [], buttons }
        } = this.state;
        return <NavBar rightItems={right} buttons={buttons} />;
    }
}

const { object, oneOfType, number, string } = PropTypes;
Header.propTypes = {
    cart: object,
    userId: oneOfType([number, string])
};

export default Header;
