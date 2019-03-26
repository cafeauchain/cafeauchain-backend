import React from "react";
import { Step } from "semantic-ui-react";

/* eslint-disable */
import Profile from "shop/customer/edit";
import steps from "shop/onboard/steps";
/* eslint-enable */

class OnboardProfile extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("profile")} />
                <Profile onboard />
            </React.Fragment>
        );
    }
}

export default OnboardProfile;