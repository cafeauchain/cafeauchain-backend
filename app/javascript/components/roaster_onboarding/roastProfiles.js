import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/actions/createInventory";
import RoastProfileInventory from "roaster_onboarding/views/roastProfiles";

import OnboardFooter from "roaster_onboarding/footer";
import steps from "roaster_onboarding/steps";

import Flex from "shared/flex";
import withContext from "contexts/withContext";
/* eslint-enable */

class RoastProfiles extends React.Component {
    state = {};
    render() {
        const { inventory = [], userId } = this.props;
        const leftBtn = { text: "Add Lots", href: "lots" };
        const rightBtn = { text: "Wholesale Details ", href: "wholesale_details", disabled: !inventory.length };
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
                        <div flex="50" style={{ maxWidth: "50%"}}>
                            <RoastProfileInventory />
                        </div>
                    </Flex>
                    <OnboardFooter left={leftBtn} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}

const { array, oneOfType, number, string } = PropTypes;
RoastProfiles.propTypes = {
    inventory: array,
    userId: oneOfType([number, string])
};

export default withContext(RoastProfiles);
