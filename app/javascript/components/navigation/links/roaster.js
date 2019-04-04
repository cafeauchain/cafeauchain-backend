import React from "react";
import { Button } from "semantic-ui-react";

const links = profile => {
    let right = [];

    if (profile) {
        right = profile.onboard_status === "onboard_completed"
            ? [{ as: "a", content: "Dashboard", key: "dashboard", href: "/manage/dashboard" }]
            : [
                {
                    as: "a",
                    content: "Complete Signup",
                    key: profile.onboard_status,
                    href: "/onboarding/" + profile.onboard_status
                }
            ];
    } else {
        right = [
            {
                as: "a",
                content: "Complete Signup",
                key: "profile",
                href: "/onboarding/profile"
            }
        ];
    }
    return {
        right: right,
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
