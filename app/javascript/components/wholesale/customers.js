import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import ErrorHandler from "shared/errorHandler";
import Modal from "shared/modal";

import CreateCustomer from "manage/customers/add";

import tableDefs from "defs/tables/manageCustomersTable";

import { sortBy } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

class Customers extends Component {
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
        const { customers, updateContext } = this.props;
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
                <br />
                <Modal
                    text="Add New Customer"
                    btnProps={{
                        icon: <Icon name="plus circle" inverted />,
                        size: "large"
                    }}
                    title="Add Customer"
                    icon="user"
                    component={<CreateCustomer updateContext={updateContext} />}
                />
            </Segment>
        );
    }
}

const { array, func } = PropTypes;
Customers.propTypes = {
    customers: array,
    updateContext: func
};

export default withContext(Customers);
