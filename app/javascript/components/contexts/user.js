import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

class ConfigProvider extends Component {
    state = {};

    render() {
        const { children, value } = this.props;
        return <Provider value={value}>{children}</Provider>;
    }
}

export { ConfigProvider };

const { node, object } = PropTypes;
ConfigProvider.propTypes = {
    children: node,
    value: object
};

export default Consumer;
