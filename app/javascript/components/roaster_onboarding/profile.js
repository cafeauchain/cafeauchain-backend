import React from "react";
import { Step } from "semantic-ui-react";

/* eslint-disable */

import RoasterProfileWizard from "roaster_profile_wizard/App";
/* eslint-enable */

const steps = [
    {
        key: "profile",
        icon: "user circle",
        title: "Profile"
    },
    {
        key: "addlots",
        icon: "list",
        title: "Add Lots"
    },
    {
        key: "roastprofiles",
        icon: "lab",
        title: "Add Roast Profiles"
    },
    {
        key: "wholesale",
        icon: "dollar",
        title: "Wholesale Details"
    }
];

class Profile extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps} />
                <RoasterProfileWizard />
            </React.Fragment>
        );
    }
}

export default Profile;
