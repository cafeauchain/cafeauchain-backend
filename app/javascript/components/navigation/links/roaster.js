import React from "react";
import { Button } from "semantic-ui-react";

const links = profile => {
    return {
        right:
            profile.onboard_status === "onboard_completed"
                ? [{ as: "a", content: "Dashboard", key: "dashboard", href: "/manage/dashboard" }]
                : [
                    {
                        as: "a",
                        content: "Complete Signup",
                        key: profile.onboard_status,
                        href: "/onboarding/" + profile.onboard_status
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
