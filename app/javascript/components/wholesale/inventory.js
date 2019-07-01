import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/roastedInventory";

import { sortBy } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

class RoastedInventory extends React.Component {
    componentDidMount() {
        const { inventory, getData } = this.props;
        if (inventory === undefined) {
            getData("inventory");
        }
    }
    render() {
        const { loading } = this.props;
        let { inventory = [] } = this.props;
        const sorted = sortBy({
            collection: inventory,
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });
        const onClick = (e, item) => {
            // eslint-disable-next-line
            console.log(item);
            alert("This should take you to more info about the roasted inventory levels.");
        };
        return (
            <F>
                <Header as="h2" content="Roasted Inventory Levels" />
                <Table tableDefs={tableDefs} data={sorted} loading={loading} onClick={onClick} />
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
