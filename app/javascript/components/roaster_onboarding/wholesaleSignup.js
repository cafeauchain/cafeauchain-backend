import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step, Divider } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import Business from "roaster_onboarding/connect/business";
import Owner from "roaster_onboarding/connect/owner";
import Opener from "roaster_onboarding/connect/opener";

import { callMeDanger } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

class WholesaleSignup extends React.PureComponent {
    render() {

        const { roaster: { wholesale_status } } = this.props;
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("bank")} />
                <Segment>
                    <Header as="h2">Wholesale Signup</Header>
                    <Divider />
                    <p>
                        {callMeDanger(`In order to process credit card payments and receive payouts, we'll 
                        need to collect some official information for tax reporting purposes. Please note 
                        that Cafe au Chain does not store any senstivive information like EIN or bank account
                        numbers on our servers.`)}
                    </p>
                    {!wholesale_status && (
                        <Business />
                    )}
                    {wholesale_status === "business" && (
                        <Opener />
                    )}
                    {(wholesale_status === "opener" || wholesale_status === "owner") && (
                        <Owner />
                    )}
                </Segment>
            </React.Fragment>
        );
    }
}

const { object } = PropTypes;
WholesaleSignup.propTypes = {
    roaster: object
};

export default withContext(WholesaleSignup);
