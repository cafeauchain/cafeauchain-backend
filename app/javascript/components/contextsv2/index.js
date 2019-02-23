import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider } from "contextsv2/main";
/* eslint-enable */

const Context = ({ roaster, children, requests }) => (
    <UserProvider value={{ roaster }}>
        <ConfigProvider id={roaster.id} requests={requests}>
            {children}
        </ConfigProvider>
    </UserProvider>
);
const { object, node, array } = PropTypes;
Context.propTypes = {
    roaster: object,
    children: node,
    requests: array
};

export default Context;
