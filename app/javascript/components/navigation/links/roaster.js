import React from "react";
import { Button } from "semantic-ui-react";

const links = () => {
    return {
        right: [],
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
