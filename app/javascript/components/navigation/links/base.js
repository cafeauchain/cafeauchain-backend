import React from "react";
import { Button } from "semantic-ui-react";

const links = {
    right: [
        { as: "a", content: "About", key: "about", href: "/blog/about" },
        { as: "a", content: "Blog", key: "blog", href: "/blog" },
        { as: "a", content: "Contact", key: "contact", href: "/contact" }
    ],
    buttons: [
        {
            content: <Button className="login-btn" content="Login" as="a" href="/login" />,
            key: "login",
            className: "no-border nav-btn",
            fitted: true
        },
        {
            content: <Button className="register-btn" content="Register" as="a" href="/register" />,
            key: "register",
            className: "no-border nav-btn",
            fitted: true
        }
    ]
};

export default links;
