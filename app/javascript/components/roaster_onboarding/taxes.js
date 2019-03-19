import React from "react";
import { Segment, Header, Step, Button, Divider } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import Flex from "shared/flex";
/* eslint-enable */

class TaxTables extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("taxes")} />
                <Segment>
                    <Header as="h2" content="Tax Tables" />
                    <br />
                    <Divider />

                    <Flex spacing="20" spacebetween>
                        <div>
                            <Button content="Shipping" icon="left arrow" labelPosition="left" as="a" href="shipping" />
                        </div>
                        <div>
                            <Button
                                content="Create Products"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                as="a"
                                href="products"
                            />
                        </div>
                    </Flex>
                </Segment>
            </React.Fragment>
        );
    }
}

export default TaxTables;
