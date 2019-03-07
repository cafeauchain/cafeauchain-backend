import React, { Fragment as F } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";

// eslint-disable-next-line
import styles from "stylesheets/variables.scss";

const links = user => {
    const { roaster_profile_id, admin, customer_profile_id } = user;
    const roasterString = "/roasters/" + roaster_profile_id;
    const buildItems = array => array.map(item => <Dropdown.Item as="a" key={item.content} {...item} />);
    const isRoaster = roaster_profile_id !== null;
    const isNew = roaster_profile_id === null && customer_profile_id === null;
    const isCustomer = customer_profile_id !== null;
    const dropdowns = {
        roaster: [
            { href: `${roasterString}/dashboard`, content: "Dashboard" },
            { href: `${roasterString}/manage_inventory`, content: "Manage Inventory" },
            { href: `${roasterString}/manage_subscription`, content: "Manage Subscription" },
            { href: `${roasterString}/edit`, content: "Edit Roaster Profile" },
            { href: `${roasterString}/wholesale`, content: "Wholesale" }
        ],
        wholesaleDropdowns: [{ href: "/", content: "Account (Doesnt work)" }, { href: "/orders", content: "Orders" }],
        nonRoaster: [{ href: "/roasters/new", content: "Complete Your Roaster Profile" }],
        admin: [
            {
                href: "/admin/dashboard",
                content: "Dashboard"
            },
            {
                href: "/admin/producers",
                content: "Manage Producers"
            }
        ]
    };
    return {
        left: [],
        right: [
            {
                content: (
                    <Dropdown text="My Account" item fluid className="no-border" style={{ height: "100%" }}>
                        <Dropdown.Menu>
                            {isRoaster && buildItems(dropdowns.roaster)}
                            {isNew && buildItems(dropdowns.nonRoaster)}
                            {isCustomer && buildItems(dropdowns.wholesaleDropdowns)}
                            {admin && (
                                <F>
                                    <Dropdown.Header
                                        icon={<Icon name="lock" size="large" />}
                                        content="Admin"
                                        style={{
                                            background: styles.lightgray,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            margin: 0
                                        }}
                                    />
                                    {buildItems(dropdowns.admin)}
                                </F>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                ),
                key: "dropdown",
                fitted: true
            }
        ],
        buttons: [
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
