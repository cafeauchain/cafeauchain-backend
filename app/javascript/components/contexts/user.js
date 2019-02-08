import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children, value }) => <Provider value={value}>{children}</Provider>;

export { ConfigProvider };

const { node, object } = PropTypes;
ConfigProvider.propTypes = {
    children: node,
    value: object
};

export default Consumer;
