import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider } from "contexts/main";
/* eslint-enable */

const Context = ({ roaster, children, requests, ...rest }) => (
    <ConfigProvider id={roaster.id} requests={requests} {...rest}>
        {children}
    </ConfigProvider>
);
const { object, node, array } = PropTypes;
Context.propTypes = {
    roaster: object,
    children: node,
    requests: array
};

export default Context;
