import React from "react";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/actions/createInventory";
import RoastProfileInventory from "roaster_onboarding/views/roastProfiles";

import Modal from "shared/modal";
/* eslint-enable */

const AllRoasts = () => {
    return (
        <Segment>
            <Header as="h2" content="Manage Roast Profiles" />
            <Modal
                text="Create Roast Profile"
                title="Create Roast Profile"
                component={<CreateInventory />}
            />
            <RoastProfileInventory />
        </Segment>
    );
};

export default AllRoasts;
