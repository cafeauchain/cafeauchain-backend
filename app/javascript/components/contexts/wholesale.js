import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import { ConfigProvider } from "contexts/main";
/* eslint-enable */

const Context = ({ children, requests }) => <ConfigProvider requests={requests}>{children}</ConfigProvider>;
const { node, array } = PropTypes;
Context.propTypes = {
    children: node,
    requests: array
};

export default Context;
