import React from "react";
import PropTypes from 'prop-types';
import { Step, Segment } from "semantic-ui-react";

/* eslint-disable */
import CustomerPayment from "payments/customer";
import steps from "shop/onboard/steps";
import OnboardFooter from "shop/onboard/footer";
import withContext from "contexts/withContext";
/* eslint-enable */

class OnboardPayment extends React.PureComponent {
    render() {
        const { cards } = this.props;
        const left = { href: 'addresses', text: 'Addresses'};
        // Until shipping is ironed out
        // const right = { href: 'shipping', text: 'Shipping Preferences' };
        const right = { href: 'onboard_completed', text: 'Complete Registration', disabled: !cards.length };
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
OnboardPayment.propTypes = {
    cards: PropTypes.array
};

export default withContext(OnboardPayment);