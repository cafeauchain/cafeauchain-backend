import React, { Fragment as F } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";

const links = ({ cart }) => {
    const { attributes } = cart;
    const total_items = attributes ? attributes.total_items : 0;
    const buildItems = array => array.map(item => <Dropdown.Item as="a" key={item.content} {...item} />);
    const dropdowns = [
        { href: "/shop/profile", content: "Profile", key: "profile" },
        { href: "/shop/profile/payment", content: "Payment", key: "payment" },
        { href: "/shop/profile/addresses", content: "Addresses", key: "addresses" },
        { href: "/shop/orders", content: "Orders", key: "orders" }
    ];
    return {
        right: {
            mobile: [
                { href: "/products", content: "Products", key: "products" },
                ...dropdowns,
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
                }
            ],
            desktop: [
                { as: "a", content: "Products", key: "products", href: "/products" },
                {
                    content: (
                        <Dropdown text="My Account" item fluid className="no-border" style={{ height: "100%" }}>
                            <Dropdown.Menu>{buildItems(dropdowns)}</Dropdown.Menu>
                        </Dropdown>
                    ),
                    key: "dropdown",
                    fitted: true
                },
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
                }
            ]
        },
        buttons: [
            {
                content: <Button className="logout-btn" content="Logout" as="a" href="/logout" />,
                key: "logout",
                className: "no-border nav-btn",
                fitted: true
            }
        ]
    };
};

export default links;
