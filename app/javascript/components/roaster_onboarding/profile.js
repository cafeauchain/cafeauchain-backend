import React from "react";
import { Step } from "semantic-ui-react";

/* eslint-disable */
import RoasterProfileWizard from "roaster_profile_wizard/App";
import steps from "roaster_onboarding/steps";
/* eslint-enable */

class Profile extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("profile")} />
                <RoasterProfileWizard />
            </React.Fragment>
        );
    }
}

export default Profile;
