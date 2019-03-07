import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Input from "shared/input";

import tableDefs from "defs/tables/manageOrdersTable";

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
        this.state = {};
    }
    onSubmit = async (e, item) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const { getCtxData } = this.props;
        const url = API_URL + "/orders/" + item["data-id"];
        const response = await requester({ url, body: { status: 4 }, method: "PUT" });
        if (response instanceof Error) {
            // this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                getCtxData("orders");
            }
        }
    };
    actions = ({ item }) => {
        return <Button onClick={this.onSubmit} data-id={item.id} primary content="Mark Paid" compact size="mini" />;
    };
    modifyTableDefs = () => {
        let inner = { ...tableDefs };
        let newField = {
            name: "",
            formatter: this.actions,
            style: { width: 100 },
            textAlign: "right"
        };
        inner.fields = [...inner.fields, newField];
        return inner;
    };
    render() {
        const { orders } = this.props;
        return (
            <F>
                <Header as="h2" content="All Orders" dividing />
                <Table tableDefs={this.modifyTableDefs()} data={orders} />
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
