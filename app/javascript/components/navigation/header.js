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
        this.state = {};
    }

    render() {
        const { cart, userId } = this.props;
        const links = userId ? (cart ? customer({ cart }) : roaster()) : base;
        const { right = [], buttons } = links;
        return <NavBar rightItems={right} buttons={buttons} />;
    }
}

const { object, oneOfType, number, string } = PropTypes;
Header.propTypes = {
    cart: object,
    userId: oneOfType([number, string])
};

export default Header;
