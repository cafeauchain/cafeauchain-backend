import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/recentTransactions";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <RecentTransactions
                {...props}
                transactions={ctx.transactions}
                loading={ctx.loading}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class RecentTransactions extends Component {
    componentDidMount() {
        const { transactions, getCtxData } = this.props;
        if (transactions === undefined) {
            getCtxData("transactions");
        }
    }
    render() {
        const { loading } = this.props;
        let { transactions } = this.props;
        if (transactions === undefined) transactions = [];
        return (
            <F>
                <Header as="h2" content="Recent Transactions" />
                <Table tableDefs={tableDefs} data={transactions} loading={loading} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
RecentTransactions.propTypes = {
    transactions: array,
    loading: bool,
    getCtxData: func
};

export default Wrapper;
