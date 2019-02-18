import React from "react";
import { Button } from "semantic-ui-react";

const links = {
    left: [],
    right: [
        { as: "a", content: "About", key: "about", href: "/about" },
        { as: "a", content: "Contact", key: "contact", href: "/contact" }
    ],
    buttons: [
        {
            as: "a",
            content: <Button className="login-btn">Login</Button>,
            key: "login",
            href: "/login",
            className: "no-border",
            fitted: true
        },
        {
            as: "a",
            content: <Button className="register-btn">Register</Button>,
            key: "register",
            href: "/register",
            className: "no-border"
        }
    ]
};

export default links;
