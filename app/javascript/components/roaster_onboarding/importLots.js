import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step, Divider } from "semantic-ui-react";

/* eslint-disable */
import SingleLot from "roaster_tools/inventory/singleContract";
import BulkLot from "roaster_tools/inventory/addLots";
import OpenLots from "roaster_tools/openContracts";

import steps from "roaster_onboarding/steps";
import OnboardFooter from "roaster_onboarding/footer";

import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class ImportLots extends React.Component {
    state = {};
    render() {
        const { lots = [], userId } = this.props;
        const rightBtn = { text: "Set Up Roast Profiles", href: "roast-profiles", disabled: !lots.length };
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

                    <OnboardFooter left={{}} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { array, oneOfType, number, string } = PropTypes;
ImportLots.propTypes = {
    lots: array,
    userId: oneOfType([number, string])
};

export default withContext(ImportLots);
