import React from "react";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/actions/createInventory";
import CreateProduct from "wholesale/actions/create";

import Flex from "shared/flex";
import Modal from "shared/modal";
/* eslint-enable */

const QuickActions = () => (
    <Segment>
        <Header as="h2" content="Quick Actions" />
        <Flex>
            <Modal text="Create Inventory Items" title="Create Inventory Item" component={<CreateInventory />} />
            <Modal text="Create Products" title="Create Product" component={<CreateProduct />} />
        </Flex>
    </Segment>
);

export default QuickActions;
