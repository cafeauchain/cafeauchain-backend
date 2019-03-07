import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Inventory from "wholesale/inventory";
import QuickActions from "wholesale/quickActions";
import Orders from "wholesale/orders";

import Context from "contexts/index";
/* eslint-enable */

const Wrapper = props => {
    const { roaster } = props;
    return (
        <Context roaster={roaster} requests={["inventory", "lots", "products"]}>
            <Dashboard {...props} />
        </Context>
    );
};

const { oneOfType, number, string, object } = PropTypes;
Wrapper.propTypes = {
    roaster_profile_id: oneOfType([number, string]),
    roaster: object
};

const Dashboard = ({ orders, roaster }) => (
    <Container style={{ margin: "4em 0" }}>
        <Segment>
            <Header as="h1" content="Manage Wholesale" />
        </Segment>
        {true && <QuickActions />}
        {true && (
            <Segment>
                <Orders orders={orders} roaster={roaster} />
            </Segment>
        )}
        {true && (
            <Segment>
                <Inventory />
            </Segment>
        )}
    </Container>
);

Dashboard.propTypes = {
    orders: object,
    roaster: object
};

export default Wrapper;
