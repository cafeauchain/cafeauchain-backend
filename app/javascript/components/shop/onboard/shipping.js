import React from "react";
import { Step, Segment } from "semantic-ui-react";

/* eslint-disable */
import steps from "shop/onboard/steps";
import OnboardFooter from "shop/onboard/footer";
/* eslint-enable */

class OnboardShipping extends React.Component {
    state = {};
    render() {
        const left = { href: 'payment', text: 'Payment Methods'};
        const right = { href: 'onboard_completed', text: 'Complete Registration' };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("shipping")} />
                <Segment>
                    <p>This will be the shipping component once its ready.</p>
                    <OnboardFooter left={left} right={right} />
                </Segment>

            </React.Fragment>
        );
    }
}

export default OnboardShipping;