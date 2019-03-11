import React from "react";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";

/* eslint-disable */
import { Money, Weights } from "shared/textFormatters";
import Table from "shared/table";

import { humanize } from "utilities";

import tableDefs from "defs/tables/ordersTable";
/* eslint-enable */

const Orders = ({ orders }) => {
    const onClick = (e, item) => {
        e.preventDefault();
        window.location = "/orders/" + item.id;
    };
    let data = [];
    if (orders) {
        data = orders.data;
    }
    return (
        <div>
            <Segment>
                <Header as="h2" content="All Orders" dividing />
                <Table tableDefs={tableDefs} data={data} onClick={onClick} />
            </Segment>
        </div>
    );
};

const { object } = PropTypes;
Orders.propTypes = {
    orders: object
};

export default Orders;
