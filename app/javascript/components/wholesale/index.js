import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import CreateInventory from "wholesale/createInventory";
import RoastedInventory from "wholesale/inventory";
import Notifier from "wholesale/notifier";
import CreateProduct from "wholesale/createProduct";
import ProductInventory from "wholesale/productInventory";
import VariantInventory from "wholesale/variantsTable";

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
        {true && <Notifier />}
        <Segment>{true && <CreateProduct />}</Segment>
        <Segment>{true && <ProductInventory />}</Segment>
        <Segment>{true && <VariantInventory />}</Segment>
        <Segment>{true && <CreateInventory />}</Segment>
        <Segment>{true && <RoastedInventory />}</Segment>
    </Container>
);

export default Wrapper;
