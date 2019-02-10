import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "tableDefinitions/recentTransactions";

import Trx from "contexts/transactions";
/* eslint-enable */

const Wrapper = props => (
    <Trx>{trx => <RecentTransactions {...props} transactions={trx.data} loading={trx.loading} />}</Trx>
);

const RecentTransactions = ({ transactions, loading }) => (
    <F>
        <Header as="h2" content="Recent Transactions" />
        <Table tableDefs={tableDefs} data={transactions} loading={loading} />
    </F>
);

const { array, bool } = PropTypes;

RecentTransactions.propTypes = {
    transactions: array,
    loading: bool
};

export default Wrapper;
