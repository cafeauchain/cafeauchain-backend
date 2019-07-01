import React from "react";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/actions/createInventory";
import CreateProduct from "wholesale/actions/createProduct";
import DefaultSizes from "wholesale/actions/createDefaultSizes";
import DefaultOptions from "wholesale/actions/createDefaultOptions";
import ManageCutoff from "wholesale/actions/manageCutoff";

import Flex from "shared/flex";
import Modal from "shared/modal";
/* eslint-enable */

const QuickActions = () => (
    <Segment>
        <Header as="h2" content="Quick Actions" />
        <Flex>
            <Modal
                text="Create Inventory Items"
                title="Create Inventory Item"
                icon="clipboard list"
                component={<CreateInventory />}
            />
            <Modal text="Create Products" title="Create Product" icon="clipboard list" component={<CreateProduct />} />
            <Modal 
                text="Manage Default Sizes"
                title="Manage Default Sizes"
                icon="clipboard list"
                component={<DefaultSizes />}
            />
            <Modal
                text="Manage Default Options"
                title="Manage Default Options"
                icon="clipboard list"
                component={<DefaultOptions />}
            />
            <Modal
                text="Manage Order Cutoff"
                title="Manage Order Cutoff Times"
                icon="clipboard list"
                component={<ManageCutoff />}
            />
        </Flex>
    </Segment>
);

export default QuickActions;
