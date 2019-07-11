import React from "react";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Inventory from "wholesale/inventory";
import QuickActions from "wholesale/quickActions";
import Orders from "wholesale/orders/orders";
/* eslint-enable */

const Dashboard = ({ orders, roaster }) => (
    <div>
        <Segment>
            <Header as="h1" content="Manage Wholesale" />
        </Segment>
        {true && <QuickActions />}
        {true && (
            <Segment>
                <Orders type="open" />
            </Segment>
        )}
        {true && (
            <Segment>
                <Inventory />
            </Segment>
        )}
    </div>
);

const { object } = PropTypes;
Dashboard.propTypes = {
    orders: object,
    roaster: object
};

export default Dashboard;
