import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Button, Icon } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import ErrorHandler from "shared/errorHandler";
import Modal from "shared/modal";

import CreateOrder from "wholesale/orders/createOrderBehalf";

import tableDefs from "defs/tables/manageOrdersTable";

import { sortBy } from "utilities";

import { requester, url as API_URL } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: []
        };
        this.tableDefs = this.modifyTableDefs();
    }

    onSubmit = async (e, item) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ loading: true });
        const { getData, type } = this.props;
        const url = API_URL + "/orders/" + item["data-id"];
        const response = await requester({ url, body: { status: 4 }, method: "PUT" });
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    await getData(type === "open" ? "open_orders" : "orders");
                    await getData("inventory");
                    this.setState({ loading: false });
                }
            }
        }, 400);
    };
    actions = ({ item }) => {
        let { orders, type, open_orders } = this.props;
        if( type === "open" ) orders = open_orders;
        const order = orders.find(order => order.id === item.id);
        if (orders.length && order.attributes.status === "fulfilled") {
            return <Icon key={item.id} name="circle check" color="green" />;
        }
        return (
            <Button
                key={item.id}
                onClick={this.onSubmit}
                data-id={item.id}
                primary
                content="Complete"
                compact
                size="mini"
            />
        );
    };
    modifyTableDefs = () => {
        let inner = { ...tableDefs };
        let newField = {
            name: "status",
            key: "action",
            formatter: this.actions,
            style: { width: 100 },
            textAlign: "center"
        };
        inner.fields = [...inner.fields, newField];
        return inner;
    };
    render() {
        let { orders, type, open_orders } = this.props;
        let title = "All Orders";
        if (type === "open") {
            orders = open_orders;
            title = "Open Orders";
        }
        const { errors, loading } = this.state;
        const sorted = sortBy({
            collection: orders,
            id: "order_date",
            sorts: [{ name: "order_date" }],
            namespace: "attributes"
        });
        return (
            <Segment>
                <Header as="h2" content={title} dividing />
                <Modal
                    text="Create Order on Customer's Behalf"
                    title="Create Order on Customer's Behalf"
                    component={<CreateOrder />}
                    size="mini"
                />
                <br />
                <br />
                <ErrorHandler errors={errors} />
                <Table tableDefs={this.tableDefs} data={sorted} loading={loading} />
            </Segment>
        );
    }
}

const { array, func, string } = PropTypes;
Orders.propTypes = {
    open_orders: array,
    orders: array,
    getData: func,
    type: string
};

export default withContext(Orders);
