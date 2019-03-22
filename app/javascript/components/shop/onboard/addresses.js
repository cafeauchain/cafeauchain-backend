import React from "react";
import { Step } from "semantic-ui-react";

/* eslint-disable */
import CustomerAddresses from "shop/customer/addresses";
import steps from "shop/onboard/steps";
/* eslint-enable */

class OnboardAddresses extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("addresses")} />
                <CustomerAddresses />
            </React.Fragment>
        );
    }
}

export default OnboardAddresses;