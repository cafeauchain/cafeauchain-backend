import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import ErrorHandler from "shared/errorHandler";

import tableDefs from "defs/tables/manageCustomersTable";

import { sortBy } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => {
    return (
        <Context>
            {ctx => (
                <Orders
                    {...props}
                    customers={ctx.customers}
                    loading={ctx.loading}
                    userId={ctx.userId}
                    getCtxData={ctx.getData}
                />
            )}
        </Context>
    );
};

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: []
        };
    }
    onClick = (e, item) => {
        window.location = "/manage/customers/" + item.id;
    };
    render() {
        const { customers } = this.props;
        const { errors, loading } = this.state;
        const sorted = sortBy({
            collection: customers,
            id: "id",
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });
        return (
            <Segment>
                <Header as="h2" content="All Customers" dividing />
                <ErrorHandler errors={errors} />
                <Table tableDefs={tableDefs} data={sorted} loading={loading} onClick={this.onClick} />
            </Segment>
        );
    }
}

const { array } = PropTypes;
Orders.propTypes = {
    customers: array
};

export default Wrapper;
