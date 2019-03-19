import React from "react";
import { Segment, Button, Header, Divider, Step } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/actions/createInventory";
import RoastProfileInventory from "wholesale/inventory";

import steps from "roaster_onboarding/steps";

import Flex from "shared/flex";
/* eslint-enable */

class ImportLots extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("roastprofiles")} />
                <Segment>
                    <Header as="h2" content="Create Roast Profiles" />
                    {/* eslint-disable */}
                    <p>
                        When starting a roast, you'll choose a roast profile for the selected lot. The green coffee
                        weight will be deducted from the on hand amount of your lot. Once you mark a roast completed, it
                        will update your inventory levels. If you are using the Cafe Au Chain wholesale platform, you
                        will be able to combine inventory items into finished products.
                    </p>
                    {/* eslint-enable */}
                    <Flex spacing="20">
                        <div flex="50">
                            <CreateInventory />
                        </div>
                        <div flex="50">
                            <RoastProfileInventory />
                        </div>
                    </Flex>
                    <Divider />
                    <Flex spacing="20" spacebetween>
                        <div>
                            <Button as="a" href="lots" content="Add Lots" icon="left arrow" labelPosition="left" />
                        </div>
                        <div>
                            <Button
                                primary
                                as="a"
                                href="wholesale-details"
                                content="Wholesale Details"
                                icon="right arrow"
                                labelPosition="right"
                            />
                        </div>
                    </Flex>
                    <div style={{ clear: "both" }} />
                </Segment>
            </React.Fragment>
        );
    }
}

export default ImportLots;
