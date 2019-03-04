import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import StartBatch from "roaster_tools/startBatch";
import Inventory from "wholesale/inventory";

import Context from "contexts/index";
/* eslint-enable */

const Wrapper = ({ roaster, ...rest }) => {
    return (
        <Context roaster={roaster} requests={["inventory", "lots", "products"]}>
            <Dashboard {...rest} />
        </Context>
    );
};

const { oneOfType, number, string, object } = PropTypes;
Wrapper.propTypes = {
    roaster_profile_id: oneOfType([number, string]),
    roaster: object
};

const Dashboard = () => (
    <Container style={{ margin: "4em 0" }}>
        <Segment>
            <Header as="h1" content="Manage Wholesale" />
        </Segment>
        <Segment>{true && <StartBatch />}</Segment>
        <Segment>{true && <Inventory />}</Segment>
    </Container>
);

export default Wrapper;
