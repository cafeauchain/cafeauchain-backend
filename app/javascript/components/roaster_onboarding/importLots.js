import React from "react";
import { Segment, Button, Header, Step, Divider } from "semantic-ui-react";

/* eslint-disable */
import SingleLot from "roaster_tools/inventory/singleContract";
import BulkLot from "roaster_tools/inventory/addLots";

import steps from "roaster_onboarding/steps";
import Flex from "shared/flex";
/* eslint-enable */

class ImportLots extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("addlots")} />
                <Segment>
                    <Header as="h1" content="Import Lots" />
                    <p>
                        Please add at least one lot. You can add lots individually or in bulk. If you want to user the
                        Bulk Lot Importer, you can use this template to fill out your lot information.
                    </p>
                    <Flex spacing="20">
                        <div flex="50">
                            <Segment.Group>
                                <Segment>
                                    <Header as="h2" content="Add Single Lot" />
                                </Segment>
                                <Segment>
                                    <SingleLot />
                                </Segment>
                            </Segment.Group>
                        </div>
                        <div flex="50">
                            <BulkLot />
                        </div>
                    </Flex>
                    <Divider />
                    <Button
                        primary
                        as="a"
                        href="roast-profiles"
                        content="Set Up Roast Profiles"
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                    />
                    <div style={{ clear: "both" }} />
                </Segment>
            </React.Fragment>
        );
    }
}

export default ImportLots;
