import React from "react";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import AcceptDelivery from "roaster_tools/inventory/acceptDelivery";
import StartBatch from "roaster_tools/startBatch";
import SingleContract from "roaster_tools/inventory/singleContract";

import Modal from "shared/modal";

import Consumer from "contexts/user";
/* eslint-enable */

const QuickActions = ({ refreshParent }) => (
    <Consumer>
        {({ id }) => {
            return (
                <Segment>
                    <Header as="h2" content="Quick Actions" />
                    <Modal
                        text="Accept Delivery"
                        title="Accept Delivery"
                        refreshParent={refreshParent}
                        component={<AcceptDelivery id={id} />}
                    />
                    <Modal
                        text="Start a Batch"
                        title="Start a Batch"
                        refreshParent={refreshParent}
                        component={<StartBatch id={id} />}
                    />
                    <Modal
                        text="New Contract"
                        title="Add a new contract"
                        refreshParent={refreshParent}
                        component={<SingleContract id={id} />}
                    />
                </Segment>
            );
        }}
    </Consumer>
);

const { func } = PropTypes;
QuickActions.propTypes = {
    refreshParent: func
};

export default QuickActions;
