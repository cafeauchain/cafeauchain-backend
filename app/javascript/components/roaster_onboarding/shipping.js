import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import OnboardFooter from "roaster_onboarding/footer";

import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class Shipping extends React.Component {
    state = {};
    render() {
        const rightBtn = { text: "Tax Tables", href: "taxes" };
        const { userId } = this.props;
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("shipping")} />
                <Segment>
                    <Header as="h2" content="Shipping" />
                    <br />
                    <OnboardFooter left={{}} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string } = PropTypes;
Shipping.propTypes = {
    userId: oneOfType([number, string])
};

export default withContext(Shipping);
