import React from "react";
import { Segment, Header, Step, Button, Divider } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import Flex from "shared/flex";
/* eslint-enable */

class Shipping extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("shipping")} />
                <Segment>
                    <Header as="h2" content="Shipping" />
                    <br />
                    <Divider />

                    <Flex spacing="20" spacebetween>
                        <div />
                        <div>
                            <Button
                                content="Tax Tables"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                as="a"
                                href="taxes"
                            />
                        </div>
                    </Flex>
                </Segment>
            </React.Fragment>
        );
    }
}

export default Shipping;
