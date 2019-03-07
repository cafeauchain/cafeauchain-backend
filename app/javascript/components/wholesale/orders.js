import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/ordersTable";
/* eslint-enable */

const Orders = ({ orders }) => {
    const onClick = (e, item) => {
        e.preventDefault();
        window.location = "/manage/orders/" + item.id;
    };
    let data = [];
    if (orders) {
        data = orders.data;
    }
    return (
        <F>
            <Header as="h2" content="All Orders" dividing />
            <Table tableDefs={tableDefs} data={data} onClick={onClick} />
        </F>
    );
};

const { object } = PropTypes;
Orders.propTypes = {
    orders: object
};

export default Orders;
