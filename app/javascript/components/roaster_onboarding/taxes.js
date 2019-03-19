import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import OnboardFooter from "roaster_onboarding/footer";

import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class TaxTables extends React.Component {
    state = {};
    render() {
        const leftBtn = { text: "Shipping", href: "shipping" };
        const rightBtn = { text: "Create Products", href: "products" };
        const { userId } = this.props;
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("taxes")} />
                <Segment>
                    <Header as="h2" content="Tax Tables" />
                    <OnboardFooter left={leftBtn} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string } = PropTypes;
TaxTables.propTypes = {
    userId: oneOfType([number, string])
};

export default withContext(TaxTables);
