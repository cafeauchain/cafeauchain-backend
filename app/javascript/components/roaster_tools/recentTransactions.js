import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "tableDefinitions/recentTransactions";

import User from "contexts/user";
/* eslint-enable */

const Wrapper = props => <User>{user => <RecentTransactions {...props} transactions={user.transactions} />}</User>;

const RecentTransactions = ({ transactions }) => (
    <F>
        <Header as="h2" content="Recent Transactions" />
        <Table tableDefs={tableDefs} data={transactions} />
    </F>
);

const { array } = PropTypes;

RecentTransactions.propTypes = {
    transactions: array
};

export default Wrapper;
