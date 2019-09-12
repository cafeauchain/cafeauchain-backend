import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import { sortBy } from "utilities";

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

        const sorted = sortBy({
            collection: queued,
            sorts: [{ name: "roast_date" }, { name: "name" }],
            namespace: "attributes"
        });
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
                <Table tableDefs={tableDefs} data={sorted} loading={loading} onClick={this.onClick} />
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
