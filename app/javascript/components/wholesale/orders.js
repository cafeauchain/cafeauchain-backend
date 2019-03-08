import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button, Icon } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import tableDefs from "defs/tables/manageOrdersTable";

import { sortBy } from "utilities";

import { requester, url as API_URL } from "utilities/apiUtils";

import Provider from "contexts/index";
import Context from "contexts/main";
/* eslint-enable */

const Wrapper = ({ orders, roaster, ...props }) => {
    const requests = orders ? [] : [];
    return (
        <Provider roaster={roaster} requests={requests}>
            <Context>
                {ctx => (
                    <Orders
                        {...props}
                        orders={ctx.orders || orders.data}
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
        this.tableDefs = this.modifyTableDefs();
    }

    onSubmit = async (e, item) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ loading: true });
        const { getCtxData } = this.props;
        const url = API_URL + "/orders/" + item["data-id"];
        const response = await requester({ url, body: { status: 4 }, method: "PUT" });
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    await getCtxData("orders");
                    this.setState({ loading: false });
                }
            }
        }, 400);
    };
    actions = ({ item }) => {
        const { orders } = this.props;
        const order = orders.find(order => order.id === item.id);
        if (order.attributes.status === "complete") {
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
        const { orders } = this.props;
        const { errors, loading } = this.state;
        const sorted = sortBy({
            collection: orders,
            id: "order_date",
            sorts: [{ name: "order_total" }],
            namespace: "attributes"
        });
        return (
            <F>
                <Header as="h2" content="All Orders" dividing />
                <ErrorHandler errors={errors} />
                <Table tableDefs={this.tableDefs} data={sorted} loading={loading} />
            </F>
        );
    }
}

const { array, object, func } = PropTypes;
Orders.propTypes = {
    orders: array,
    getCtxData: func
};
Wrapper.propTypes = {
    orders: object,
    roaster: object
};

export default Wrapper;
