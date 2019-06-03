import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Step, Divider, Container } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/steps";

import Flex from "shared/flex";

import { requester, roasterUrl } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class WholesaleSetup extends React.Component {
    handleStatusUpdate = async (e, item) => {
        const { userId } = this.props;
        const type = item["data-type"];
        const url = roasterUrl(userId) + "/update_" + type + "_status";
        const status = item["data-status"];
        const response = await requester({ url, body: { status }, method: "PUT" });
        if (response instanceof Error) {
            // eslint-disable-next-line
            console.log(response);
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                // eslint-disable-next-line
                console.log(response);
            }
        }
    };
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("wholesale")} />
                <Segment>
                    <Container text>
                        <Header as="h1" content="Wholesale Signup" />
                        <p>
                            In addition to the basic Roaster Platform offered by Cafe au Chain, we are excited to offer
                            a platform to help you manage your wholesale business. This platform will offer the ability
                            to provide your wholesale customers with a streamlined ordering experience. You can accept
                            payment immediately via Stripe or you can set up payment terms for preferred customers. You
                            can create as many products as you want to offer and you can include as many different
                            variations as you like. We have integrated with EasyPost to provide you with an easy way to
                            calculate shipping and fulfill orders. All of this is available for a flat fee of 5% plus a
                            monthly fee of $9.99. To get started, make your selection below. You can always signup later
                            if you change your mind.
                        </p>
                        <Divider />
                        <Flex spacing="20" spacebetween>
                            <div>
                                <Button
                                    content="Finish Registration"
                                    onClick={this.handleStatusUpdate}
                                    data-status="onboard_completed"
                                    data-type="wholesale"
                                />
                            </div>
                            <div>
                                <Button
                                    content="Continue with Wholesale"
                                    onClick={this.handleStatusUpdate}
                                    data-status="wholesale_signup"
                                    data-type="onboard"
                                    icon="right arrow"
                                    labelPosition="right"
                                    primary
                                />
                            </div>
                        </Flex>
                    </Container>
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string } = PropTypes;
WholesaleSetup.propTypes = {
    userId: oneOfType([number, string])
};

export default withContext(WholesaleSetup);
