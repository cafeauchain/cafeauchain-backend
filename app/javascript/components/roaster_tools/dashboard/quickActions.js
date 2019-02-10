import React from "react";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import AcceptDelivery from "roaster_tools/inventory/acceptDelivery";
import StartBatch from "roaster_tools/startBatch";
import SingleContract from "roaster_tools/inventory/singleContract";

import Modal from "shared/modal";
/* eslint-enable */

const QuickActions = () => (
    <Segment>
        <Header as="h2" content="Quick Actions" />
        <Modal text="Accept Delivery" title="Accept Delivery" component={<AcceptDelivery />} />
        <Modal text="Start a Batch" title="Start a Batch" component={<StartBatch />} />
        <Modal text="New Contract" title="Add a new contract" component={<SingleContract />} />
    </Segment>
);

export default QuickActions;
