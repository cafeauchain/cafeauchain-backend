import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import OnboardFooter from "roaster_onboarding/footer";
import AddShipping from "shipping/addShipping"

import withContext from "contexts/withContext";
/* eslint-enable */

class Shipping extends React.PureComponent {
    render() {
        const { userId, shipping_methods } = this.props;
        const rightBtn = { text: "Products", href: "products", disabled: !shipping_methods.length };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("shipping")} />
                <Segment>
                    <Header as="h2" content="Shipping" dividing />
                    <AddShipping />
                    <OnboardFooter left={{}} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string, array } = PropTypes;
Shipping.propTypes = {
    userId: oneOfType([number, string]),
    shipping_methods: array
};

export default withContext(Shipping);
