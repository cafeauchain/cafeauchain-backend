import React, { Fragment as F } from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import Products from "shop/products";
import CartDetails from "shop/cartDetails";

import Flex from "shared/flex";
/* eslint-enable */

const Dashboard = (props) => {
    const { customer: { company_name } } = props;
    return (
        <F>
            <Segment>
                <Header as="h1" content={"Create Order for " + company_name} />
            </Segment>
            <Flex spacing="20">
                <div flex="66">
                    <Products />
                </div>
                <div flex="33">
                    <CartDetails />
                </div>

            </Flex>

        </F>
    );
};
Dashboard.propTypes = {
    customer: PropTypes.object
};

export default Dashboard;
