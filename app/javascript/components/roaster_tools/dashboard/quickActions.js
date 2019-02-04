import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Modal, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import AcceptDelivery from "roaster_tools/inventory/acceptDelivery";
import StartBatch from "roaster_tools/startBatch";
/* eslint-enable */

class QuickActions extends Component {
    buildModal = ({ text, title, component, size = "mini", centered = false, icon = "archive" }) => {
        return (
            <Modal trigger={<Button primary>{text}</Button>} closeIcon size={size} centered={centered}>
                <Header icon={icon} content={title} />
                <Modal.Content>{component}</Modal.Content>
            </Modal>
        );
    };
    render() {
        const { id } = this.props;
        const BuildModal = this.buildModal;
        return (
            <Segment>
                <Header as="h2" content="Quick Actions" />
                <BuildModal
                    text="Accept Delivery"
                    title="Accept Delivery"
                    component={<AcceptDelivery roasterId={id} />}
                />
                <BuildModal text="Start a Batch" title="Start a Batch" component={<StartBatch roasterId={id} />} />
            </Segment>
        );
    }
}

const { oneOfType, number, string } = PropTypes;
QuickActions.propTypes = {
    id: oneOfType([number, string])
};

export default QuickActions;
