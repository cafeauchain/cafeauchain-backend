import React from "react";
import { Button, Dropdown } from "semantic-ui-react";

<<<<<<< HEAD
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
        admin: [{ href: "/admin/dashboard", content: "Dashboard" }]
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
=======
const links = props => {
    return(
        {
            left: [{ as: "a", content: "Home", key: "home", href: "/roasters/" + props.user.roaster_profile_id }, { as: "a", content: "Users", key: "users" }],
            right: [{ as: "a", content: "Manage Subscription", key: "manage_subscription", href: "/roasters/" + props.user.roaster_profile_id + "/manage_subscription" }, { as: "a", content: "Register", key: "register" }],
            buttons: [
                {
                    as: "a",
                    content: <Button className="logout-btn">Logout</Button>,
                    key: "logout",
                    href: "/logout",
                    className: "no-border"
                }
            ]
        }
    )
>>>>>>> Working on nav
};

export default links;
