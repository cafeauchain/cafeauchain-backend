import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import ErrorHandler from "shared/errorHandler";

import tableDefs from "defs/tables/manageCustomersTable";

import { sortBy } from "utilities";

import Provider from "contexts/index";
import Context from "contexts/main";
/* eslint-enable */

const Wrapper = ({ roaster, customers, ...props }) => {
    const requests = [];
    return (
        <Provider roaster={roaster} requests={requests}>
            <Context>
                {ctx => (
                    <Orders
                        {...props}
                        customers={ctx.customers || customers.data}
                        loading={ctx.loading}
                        userId={ctx.userId}
                        getCtxData={ctx.getData}
                    />
                )}
            </Context>
        </Provider>
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
            <Container style={{ margin: "4em 0" }}>
                <Segment>
                    <Header as="h2" content="All Customers" dividing />
                    <ErrorHandler errors={errors} />
                    <Table tableDefs={tableDefs} data={sorted} loading={loading} onClick={this.onClick} />
                </Segment>
            </Container>
        );
    }
}

const { array, object } = PropTypes;
Orders.propTypes = {
    customers: array
};
Wrapper.propTypes = {
    roaster: object,
    customers: object
};

export default Wrapper;
