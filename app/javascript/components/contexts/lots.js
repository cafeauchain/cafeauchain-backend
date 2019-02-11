// TODO Refactor this so I have a single basic context
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
            userId: props.value.id,
            data: [],
            updateContext: this.updateContext,
            loading: true
        };
        /* eslint-enable */
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        const { loading } = this.state;
        if (loading) {
            // eslint-disable-next-line
            setTimeout(() => this.setState({ loading: false }, console.log("updating loader")), 600);
        }
    }

    updateContext = stateObj => {
        this.setState({ loading: true }, this.setState(stateObj));
    };

    getData = async () => {
        const { url } = this.props;
        const response = await fetch(url);
        const { data } = await response.json();
        this.setState({ data });
    };

    render() {
        const { children } = this.props;
        return <Provider value={{ ...this.state }}>{children}</Provider>;
    }
}

export { ConfigProvider };

const { node, object, string } = PropTypes;
ConfigProvider.propTypes = {
    children: node,
    value: object,
    url: string
};

export default Consumer;
