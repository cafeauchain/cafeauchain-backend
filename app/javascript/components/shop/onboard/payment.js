import React from "react";
import { Step, Segment } from "semantic-ui-react";

/* eslint-disable */
import CustomerPayment from "payments/customer";
import steps from "shop/onboard/steps";
import OnboardFooter from "shop/onboard/footer";
/* eslint-enable */

class OnboardPayment extends React.Component {
    state = {};
    render() {
        const left = { href: 'addresses', text: 'Addresses'};
        const right = { href: 'shipping', text: 'Shipping Preferences', as: 'a' };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("payment")} />
                <Segment>
                    <CustomerPayment />
                    <OnboardFooter left={left} right={right} />
                </Segment>

            </React.Fragment>
        );
    }
}

export default OnboardPayment;