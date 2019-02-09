import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "tableDefinitions/openContracts";

import User from "contexts/user";
/* eslint-enable */

const Wrapper = props => <User>{user => <OpenContracts {...props} lots={user.lots} />}</User>;

const OpenContracts = ({ lots }) => (
    <F>
        <Header as="h2" content="Open Contracts" />
        <Table tableDefs={tableDefs} data={lots} />
    </F>
);

const { array } = PropTypes;
OpenContracts.propTypes = {
    lots: array
};

export default Wrapper;
