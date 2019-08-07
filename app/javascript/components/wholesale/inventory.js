import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import tableDefs from "defs/tables/roastedInventory";

import { sortBy } from "utilities";

import EditRoastedInventory from "roaster_tools/actions/editRoastedInventory";

import withContext from "contexts/withContext";
/* eslint-enable */

class RoastedInventory extends React.Component {

    state = {
        isOpen: false,
        current: {}
    };

    componentDidMount() {
        const { inventory, getData } = this.props;
        if (inventory === undefined) {
            getData("inventory");
        }
    }

    closeModal = () => this.setState({ isOpen: false, current: {} });

    onClick = (e, item) => {
        this.setState({
            isOpen: true,
            current: item
        });
    };


    render() {
        const { loading } = this.props;
        let { inventory = [] } = this.props;
        const { isOpen, current } = this.state;
        const { attributes } = current;
        const sorted = sortBy({
            collection: inventory,
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });

        return (
            <F>
                {isOpen && (
                    <Modal
                        size="tiny"
                        title={"Edit Roasted Amount of " + attributes.name}
                        icon="edit"
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        component={<EditRoastedInventory current={current} />}
                    />
                )}
                <Header as="h2" content="Roasted Inventory Levels" />
                <Table tableDefs={tableDefs} data={sorted} loading={loading} onClick={this.onClick} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
RoastedInventory.propTypes = {
    inventory: array,
    loading: bool,
    getData: func
};

export default withContext(RoastedInventory);
