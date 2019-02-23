import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

class ConfigProvider extends React.Component {
    // TODO Propbably don't need state here.
    constructor(props) {
        super(props);
        /* eslint-disable */
        this.state = {
            id: props.value.id
        };
        /* eslint-enable */
    }

    render() {
        const { children } = this.props;
        return <Provider value={{ ...this.state }}>{children}</Provider>;
    }
}

export { ConfigProvider };

const { node, object } = PropTypes;
ConfigProvider.propTypes = {
    children: node,
    value: object
};

export default Consumer;
