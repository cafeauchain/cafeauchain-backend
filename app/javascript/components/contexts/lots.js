import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

/* eslint-disable */
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

class ConfigProvider extends React.Component {
    constructor(props) {
        super(props);
        /* eslint-disable */
        this.state = {
            id: props.value.id,
            lots: [],
            updateContext: stateObj => this.setState({ loading: true }, this.setState(stateObj)),
            loading: true
        };
        /* eslint-enable */
    }

    componentDidMount() {
        const { id } = this.state;
        this.getLots(id);
    }

    componentDidUpdate() {
        const { loading } = this.state;
        if (loading) {
            // eslint-disable-next-line
            setTimeout(() => this.setState({ loading: false }, console.log("updating loader")), 600);
        }
    }

    getData = async (url, name) => {
        const response = await fetch(url);
        const { data } = await response.json();
        this.setState({ [name]: data });
    };

    getLots = id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        this.getData(url, "lots");
    };

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
