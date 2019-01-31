import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import API_URL from "utilities/apiUtils/url";
import tableDefs from "tableDefinitions/recentTransactions";
/* eslint-enable */

class RecentTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        const { id } = this.props;
        this.getTransactions(id);
    }

    getTransactions = async id => {
        const url = `${API_URL}/roasters/${id}/transactions`;
        const response = await fetch(url);
        if (response.ok) {
            const res = await response.json();
            const data = res;
            this.setState({ data });
        }
    };
    render() {
        const { data } = this.state;

        return (
            <F>
                <Header as="h2" content="Recent Transactions" />
                <Table tableDefs={tableDefs} data={data} />
            </F>
        );
    }
}

const { oneOfType, number, string } = PropTypes;
RecentTransactions.propTypes = {
    id: oneOfType([number, string])
};

export default RecentTransactions;
