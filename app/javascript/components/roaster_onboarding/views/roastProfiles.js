import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/roastProfiles";

import withContext from "contexts/withContext";
/* eslint-enable */

class RoastProfiles extends React.Component {
    componentDidMount() {
        const { inventory, getData } = this.props;
        if (inventory === undefined) {
            getData("inventory");
        }
    }
    render() {
        const { loading } = this.props;
        let { inventory = [] } = this.props;
        const onClick = (e, item) => {
            // eslint-disable-next-line
            console.log(item);
            alert("This should take you to more info about the roasted inventory levels.");
        };
        return (
            <F>
                <Header as="h2" content="Roast Profiles" />
                <Table tableDefs={tableDefs} data={inventory} loading={loading} onClick={onClick} />
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
