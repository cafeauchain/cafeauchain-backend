import React from "react";
import { Button } from "semantic-ui-react";

const links = {
    left: [{ as: "a", content: "Home", key: "home", href: "/roasters/1" }, { as: "a", content: "Users", key: "users" }],
    right: [{ as: "a", content: "Login", key: "login" }, { as: "a", content: "Register", key: "register" }],
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

export default links;
