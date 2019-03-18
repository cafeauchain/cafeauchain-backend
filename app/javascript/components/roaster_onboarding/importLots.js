import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Step, Divider } from "semantic-ui-react";

/* eslint-disable */
import SingleLot from "roaster_tools/inventory/singleContract";
import BulkLot from "roaster_tools/inventory/addLots";
import OpenLots from "roaster_tools/openContracts";

import steps from "roaster_onboarding/steps";
import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class ImportLots extends React.Component {
    state = {};
    render() {
        const { lots } = this.props;
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

                    <OpenLots />

                    <Divider />

                    <Button
                        primary
                        as="a"
                        href="roast-profiles"
                        content="Set Up Roast Profiles"
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        disabled={!lots.length}
                    />
                    <div style={{ clear: "both" }} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { array } = PropTypes;
ImportLots.propTypes = {
    lots: array
};

export default withContext(ImportLots);
