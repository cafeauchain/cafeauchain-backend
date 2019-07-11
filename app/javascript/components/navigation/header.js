import React, { Component } from "react";
import PropTypes from "prop-types";

import NavBar from "./responsiveNavbar";
import base from "./links/base";
import customer from "./links/customer";
import roaster from "./links/roaster";
import AdminNav from "./adminNav";
import "./nav.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line
        console.log(props);
        this.state = {};
    }

    render() {
        const { cart, roaster: roasterProfile, loggedIn, header_info, isAssumedCustomer } = this.props;
        const links = loggedIn ? (cart && !isAssumedCustomer ? customer({ cart }) : roaster(roasterProfile)) : base;
        const loggedInRoaster = loggedIn && !cart && !!roasterProfile;
        const { right = [], buttons } = links;
        return (
            <NavBar rightItems={right} buttons={buttons} header_info={header_info} loggedInRoaster={loggedInRoaster}>
                {loggedInRoaster && <AdminNav />}
            </NavBar>
        );
    }
}

const { object, bool } = PropTypes;
Header.propTypes = {
    cart: object,
    loggedIn: bool,
    roaster: object,
    header_info: object,
    isAssumedCustomer: bool
};

export default Header;
