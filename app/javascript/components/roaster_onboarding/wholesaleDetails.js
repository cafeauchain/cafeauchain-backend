import React from "react";
import { Segment, Button, Header, Step, Divider, Container } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/steps";
import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class WholesaleSetup extends React.Component {
    state = {};
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
                        <Flex spacing="20" centerboth>
                            <div>
                                <Button content="Finish Registration" />
                            </div>
                            <div>
                                <Button
                                    content="Continue with Wholesale"
                                    as="a"
                                    href="wholesale-signup"
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

export default withContext(WholesaleSetup);
