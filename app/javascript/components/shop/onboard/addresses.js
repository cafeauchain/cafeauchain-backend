import React from "react";
import { Step, Segment } from "semantic-ui-react";

/* eslint-disable */
import CustomerAddresses from "shop/customer/addresses";
import steps from "shop/onboard/steps";
import OnboardFooter from "shop/onboard/footer";
/* eslint-enable */

class OnboardAddresses extends React.Component {
    state = {};
    render() {
        const left = {};
        const right = {href: 'payment', text: 'Payment Method'};
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("addresses")} />
                <Segment>
                    <CustomerAddresses />
                    <OnboardFooter left={left} right={right} />
                </Segment>
                
            </React.Fragment>
        );
    }
}

export default OnboardAddresses;