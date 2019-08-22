import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import ErrorHandler from "shared/errorHandler";
import Modal from "shared/modal";
import Flex from "shared/flex";
import Input from "shared/input";

import CreateOrder from "wholesale/orders/createOrderBehalf";

import tableDefs from "defs/tables/manageOrdersTable";

import { params as paramatize, paramString, underscorer } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

class Orders extends Component {
    constructor(props) {
        super(props);
        let string = window.location.search;
        let params = paramatize(string);
        this.state = {
            loading: true,
            errors: [],
            details: { 
                status: params.status,
                invoice_status: params.invoice_status,
                range: params.range
            }
        };
    }
    componentDidMount(){
        const { orders = [], getData } = this.props;
        if( !orders.length ){
            getData("orders", window.location.search).then( () => this.setState({ loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    handlePager = obj => {
        const { getData } = this.props;
        if( obj.startLoader ){
            this.setState({ loading: true });
        } else {
            getData("orders", obj.paramString ).then( () => this.setState({ loading: false }));
        }
    }

    updateStatus = (e, { value, name }) => {
        const { getData } = this.props;
        let string = window.location.search;
        let params = paramatize(string);
        params[name] = value;
        params.page = 1;
        const newParamString = paramString(params);

        let { details } = this.state;
        details = { ...details };
        details[name] = value;
        this.setState({ loading: true, details });

        window.history.pushState(null, null, newParamString);
        getData("orders", newParamString).then(() => this.setState({ loading: false }));
    }

    clearFilters = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const { getData } = this.props;
        let string = window.location.search;
        let params = paramatize(string);

        let { details } = this.state;
        details = { ...details };
        for (const prop in details) {
            details[prop] = "";
            delete params[prop];
        }
        this.setState({ loading: true, details });

        const newParamString = paramString(params);
        window.history.pushState(null, null, newParamString);
        getData("orders", newParamString).then(() => this.setState({ loading: false }));
    }

    buildOptions = arr => arr.map( item => ({ key: underscorer(item), value: underscorer(item), text: item }))

    render() {
        let { orders = [], type, open_orders, orders_paging } = this.props;
        let title = "All Orders";
        if (type === "open") {
            orders = open_orders;
            title = "Open Orders";
        }
        const { errors, loading, details } = this.state;
        const statuses = ["Open", "Processing", "Packed", "Shipped", "Fulfilled", "All" ];
        const dates = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month" ];
        const invoice_statuses = ["Processing", "Awaiting Payment", "Payment Authorized", "Paid in Full", "All"];

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
                <Segment>
                    <Flex spacebetween wrap spacing="10">
                        <div flex="25">
                            <Input
                                inputType="select"
                                onChange={this.updateStatus}
                                name="status"
                                label="Order Status"
                                options={this.buildOptions(statuses)}
                                value={details.status || ""}
                            />
                        </div>
                        <div flex="25">
                            <Input
                                inputType="select"
                                onChange={this.updateStatus}
                                name="invoice_status"
                                label="Payment Status"
                                options={this.buildOptions(invoice_statuses)}
                                value={details.invoice_status || ""}
                            />
                        </div>
                        <div flex="25">
                            <Input
                                inputType="select"
                                onChange={this.updateStatus}
                                name="range"
                                label="Dates"
                                options={this.buildOptions(dates)}
                                value={details.range || ""}
                            />
                        </div>
                        <div flex="auto" style={{ marginTop: "auto" }}>
                            <Button content="Reset Filters" onClick={this.clearFilters} size="small" />
                        </div>
                    </Flex>
                    <div style={{ marginBottom: 10 }} />
                </Segment>
                <ErrorHandler errors={errors} />
                <Table
                    tableDefs={tableDefs}
                    data={orders}
                    loading={loading}
                    pagination={orders_paging}
                    onPageChange={this.handlePager}
                />    
                
            </Segment>
        );
    }
}

const { array, func, string, object } = PropTypes;
Orders.propTypes = {
    open_orders: array,
    orders: array,
    orders_paging: object,
    getData: func,
    type: string
};

export default withContext(Orders);
