import React from "react";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import EditCustomer from "wholesale/editCustomer";

import { sortBy } from "utilities";

import tableDefs from "defs/tables/customerOrdersTable";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = ({ customer, ...props }) => {
    return (
        <div>
            <Context>
                {ctx => (
                    <Order
                        {...props}
                        customer={ctx.customer || customer.data}
                        loading={ctx.loading}
                        userId={ctx.userId}
                        getCtxData={ctx.getData}
                    />
                )}
            </Context>
        </div>
    );
};

Wrapper.propTypes = {
    customer: PropTypes.object
};

class Order extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            customer: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = (e, item) => {
        e.preventDefault();
        window.location = "/manage/orders/" + item.id;
    };

    render() {
        const { customer } = this.props;
        const { attributes, id } = customer;
        const orders = attributes ? attributes.orders : [];
        const sorted = sortBy({ collection: orders, id: "id", sorts: [{ name: "status" }] });
        const profile = {
            id: id,
            company_name: attributes.company_name || "",
            name: attributes ? attributes.owner.name : "",
            email: attributes.email || "",
            address_1: attributes.addresses.length ? attributes.addresses[0].address_1 : "",
            address_2: attributes.addresses.length ? attributes.addresses[0].address_2 : "",
            city: attributes.addresses.length ? attributes.addresses[0].city : "",
            state: attributes.addresses.length ? attributes.addresses[0].state : "",
            zip_code: attributes.addresses.length ? attributes.addresses[0].zip_code : "",
            terms: attributes.terms
        };
        return (
            <div>
                <Segment>
                    <Header as="h2" content="Customer Details" dividing />
                    <EditCustomer profile={profile} />
                    <Table tableDefs={tableDefs} data={sorted} onClick={this.onClick} />
                </Segment>
            </div>
        );
    }
}

export default Wrapper;
