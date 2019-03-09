// TODO: Add roaster profile slug for links, and user role for conditional links
import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import NavBar from "./responsiveNavbar";

import authorized from "./links/auth";
import base from "./links/base";
import "./nav.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        //eslint-disable-next-line
        const { loggedIn, user } = props;
        this.state = {
            links: loggedIn ? authorized(user) : base
        };
    }

    // componentDidMount() {
    //     // TODO This is probably a really bad idea
    //     const { getCtxData, isCustomer } = this.props;
    //     if (isCustomer) {
    //         var oldFetch = fetch;
    //         // eslint-disable-next-line
    //         fetch = (url, options) => {
    //             var promise = oldFetch(url, options);
    //             if (url === "/api/v1/carts" && options && options.method === "POST") {
    //                 const inner = async () => {
    //                     const resolved = await promise;
    //                     if (resolved.ok) getCtxData("cart");
    //                     return resolved;
    //                 };
    //                 inner();
    //             }
    //             return promise;
    //         };
    //     }
    // }

    renderCartButton = items => {
        return {
            as: "a",
            content: (
                <F>
                    <Icon.Group size="big">
                        <Icon name="cart" />
                        <Icon
                            corner="top right"
                            name="check circle"
                            color="green"
                            className="pulse"
                            key={items.length}
                        />
                    </Icon.Group>
                    <span> Cart</span>
                </F>
            ),
            key: "cart",
            href: "/cart"
        };
    };

    render() {
        const { links } = this.state;
        const { cart, isCustomer } = this.props;
        const cart_items = cart && cart.attributes ? cart.attributes.cart_items : [];
        let buttons = links.buttons;
        if (isCustomer) {
            buttons = [this.renderCartButton(cart_items), ...buttons];
        }
        return <NavBar leftItems={links.left} rightItems={[]} buttons={buttons} />;
    }
}

const { bool, object } = PropTypes;
Header.propTypes = {
    loggedIn: bool.isRequired,
    user: object,
    cart: object,
    isCustomer: bool
};

export default Header;
