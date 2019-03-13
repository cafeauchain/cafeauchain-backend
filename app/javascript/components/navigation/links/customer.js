import React, { Fragment as F } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";

// eslint-disable-next-line
import styles from "stylesheets/variables.scss";

const links = ({ cart }) => {
    const { attributes } = cart;
    const total_items = attributes ? attributes.total_items : 0;
    const buildItems = array => array.map(item => <Dropdown.Item as="a" key={item.content} {...item} />);
    const dropdowns = [{ href: "/", content: "Account (Doesnt work)" }, { href: "/orders", content: "Orders" }];
    return {
        right: [
            {
                content: (
                    <Dropdown text="My Account" item fluid className="no-border" style={{ height: "100%" }}>
                        <Dropdown.Menu>{buildItems(dropdowns)}</Dropdown.Menu>
                    </Dropdown>
                ),
                key: "dropdown",
                fitted: true
            }
        ],
        buttons: [
            {
                as: "a",
                content: (
                    <F>
                        <Icon.Group size="big">
                            <Icon name="cart" />
                            {total_items > 0 && (
                                <Icon
                                    corner="top right"
                                    name="check circle"
                                    color="green"
                                    className="pulse"
                                    key={total_items}
                                />
                            )}
                        </Icon.Group>
                        <span> Cart</span>
                    </F>
                ),
                key: "cart",
                href: "/cart"
            },
            {
                as: "a",
                content: <Button className="logout-btn">Logout</Button>,
                key: "logout",
                href: "/logout",
                className: "no-border"
            }
        ]
    };
};

export default links;
