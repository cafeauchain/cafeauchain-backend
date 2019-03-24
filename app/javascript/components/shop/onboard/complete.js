import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Step, Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import steps from "shop/onboard/steps";

import { callMeDanger } from "utilities";
/* eslint-enable */

class OnboardComplete extends React.Component {
    state = {};
    render() {
        const { roaster } = this.props;
        /* eslint-disable */
        const msg = `Thank you for completing your registration! 
                    Before you can start placing orders, <strong>${roaster.name}</strong> will have to approve your application. 
                    They have been notified that you application is complete and they should approve your status shortly.
                    If you have any questions, you can reach out to them directly.`;
        /* eslint-enable */
        return (
            <F>
                <Step.Group fluid items={steps()} />
                <Segment>
                    <Header content="Registration Complete!" as="h2" dividing /> 
                    <p>
                        {callMeDanger(msg)}
                    </p>
                </Segment>

            </F>
        );
    }
}
OnboardComplete.propTypes = {
    roaster: PropTypes.object
};

export default OnboardComplete;