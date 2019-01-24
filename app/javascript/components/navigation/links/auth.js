import React from "react";
import { Button, Dropdown } from "semantic-ui-react";

const links = user => {
    const { roaster_profile_id, admin } = user;
    const roasterString = "/roasters/" + roaster_profile_id;
    const buildItems = array => array.map(item => <Dropdown.Item as="a" key={item.content} {...item} />);
    const dropdowns = {
        roaster: [
            { href: `${roasterString}/manage_subscription`, content: "Manage Subscription" },
            { href: `${roasterString}/edit`, content: "Edit Profile" }
        ],
        nonRoaster: [{ href: "/roasters/new", content: "Complete Your Roaster Profile" }],
        admin: [{ href: "/admin/dashboard", content: "Dashboard" }, {href: "/admin/producers", content: "Manage Producers"}]
    };
    return {
        left: [],
        right: [
            {
                content: (
                    <Dropdown text="My Account" item fluid className="no-border" style={{ height: "100%" }}>
                        <Dropdown.Menu>
                            {roaster_profile_id && buildItems(dropdowns.roaster)}
                            {!roaster_profile_id && buildItems(dropdowns.nonRoaster)}
                            {admin && buildItems(dropdowns.admin)}
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