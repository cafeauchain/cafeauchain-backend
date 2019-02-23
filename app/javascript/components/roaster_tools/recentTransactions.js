import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/recentTransactions";

import Context from "contextsv2/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>{ctx => <RecentTransactions {...props} transactions={ctx.transactions} loading={ctx.loading} />}</Context>
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
