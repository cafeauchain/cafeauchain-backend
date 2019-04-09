import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import QueuedRoast from "roaster_tools/actions/queuedRoast";

import tableDefs from "defs/tables/queuedRoasts";

import withContext from "contexts/withContext";
/* eslint-enable */

class QueuedRoasts extends Component {
    state = {
        isOpen: false,
        current: {}
    };

    componentDidMount() {
        const { queued, inventory, getData } = this.props;
        if (queued === undefined) getData("queued");
        if (inventory === undefined) getData("inventory");
    }

    closeModal = () => this.setState({ isOpen: false, current: {} });

    onClick = (e, item) => {
        this.setState({
            isOpen: true,
            current: item
        });
    };

    render() {
        const { loading, queued = [] } = this.props;
        const { isOpen, current } = this.state;
        const { attributes } = current;
        const title = attributes ? attributes.inventory_item_name + " (" + attributes.lot_name + ")": "";
        return (
            <F>
                {isOpen && (
                    <Modal
                        title={"Start Batch: " + title}
                        icon="edit"
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        component={<QueuedRoast current={current} />}
                    />
                )}
                <Header as="h2" content="Queued Roasts" />
                <Table tableDefs={tableDefs} data={queued} loading={loading} onClick={this.onClick} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
QueuedRoasts.propTypes = {
    queued: array,
    loading: bool,
    inventory: array,
    getData: func
};

export default withContext(QueuedRoasts);