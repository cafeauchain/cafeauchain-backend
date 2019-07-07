import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import { sortBy } from "utilities";

import CreateInventory from "wholesale/actions/createInventory";

import tableDefs from "defs/tables/roastProfiles";

import withContext from "contexts/withContext";
/* eslint-enable */

class RoastProfiles extends React.Component {
    state = {
        isOpen: false,
        current: {}
    }
    componentDidMount() {
        const { inventory, getData } = this.props;
        if (inventory === undefined) {
            getData("inventory");
        }
    }
    handleClick = async (e, item) => {
        console.log( item );
        this.setState({ isOpen: true, current: item });
    }
    closeModal = () => this.setState({ isOpen: false, current: {} })
    render() {
        const { loading } = this.props;
        let { inventory = [] } = this.props;
        const sorted = sortBy({
            collection: inventory,
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });
        const { isOpen, current } = this.state;
        return (
            <F>
                {isOpen && (
                    <Modal 
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        icon="coffee"
                        title="Edit Roast Profile"
                        component={<CreateInventory onboarding profile={current} />}
                    />
                )}
                <Header as="h2" content="Roast Profiles" />
                <Table tableDefs={tableDefs} data={inventory} loading={loading} onClick={this.handleClick} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
RoastProfiles.propTypes = {
    inventory: array,
    loading: bool,
    getData: func
};

export default withContext(RoastProfiles);
