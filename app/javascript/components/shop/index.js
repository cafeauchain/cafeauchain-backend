import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Products from "shop/products";

import Context from "contexts/index";
/* eslint-enable */

const Wrapper = props => {
    // const requests = ["products", "variants"].filter(request => !props[request]);
    const { roaster, ...rest } = props;
    const requests = ["products", "variants"];
    return (
        <Context roaster={roaster} requests={requests}>
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
    <F>
        <Segment>
            <Header as="h1" content="Shop Wholesale" />
        </Segment>
        {true && (
            <Segment>
                <Products />
            </Segment>
        )}
    </F>
);

export default Wrapper;
