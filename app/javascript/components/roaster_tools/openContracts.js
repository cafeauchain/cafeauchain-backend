import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "tableDefinitions/openContracts";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => <Lots>{lots => <OpenContracts {...props} lots={lots.data} loading={lots.loading} />}</Lots>;

const OpenContracts = ({ lots, loading }) => (
    <F>
        <Header as="h2" content="Open Contracts" />
        <Table tableDefs={tableDefs} data={lots} loading={loading} />
    </F>
);

const { array, bool } = PropTypes;
OpenContracts.propTypes = {
    lots: array,
    loading: bool
};

export default Wrapper;
