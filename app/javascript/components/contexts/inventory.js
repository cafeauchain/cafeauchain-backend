import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

// eslint-disable-next-line
import ContextHandler from "contexts/base/contextCollection";

const ConfigProvider = ({ value, children }) => {
    return (
        <ContextHandler value={value}>
            <Provider>{children}</Provider>
        </ContextHandler>
    );
};
const { object, node } = PropTypes;
ConfigProvider.propTypes = {
    value: object,
    children: node
};

export { ConfigProvider };

export default Consumer;
