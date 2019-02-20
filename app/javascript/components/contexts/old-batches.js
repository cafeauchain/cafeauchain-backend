// TODO Refactor this so I have a single basic context
import React, { createContext } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line
import urls from "contexts/base/urls";

const { Provider, Consumer } = createContext();

class ConfigProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.value.id,
            data: [],
            updateContext: this.updateContext,
            loading: true
        };
    }

    componentDidMount() {
        const {
            value: { requests, name }
        } = this.props;
        const request = requests.indexOf(name) > -1;
        if (request) this.getData();
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
        const {
            value: { id, name }
        } = this.props;
        const response = await fetch(urls(id)[name]);
        const { data } = await response.json();
        this.setState({ data });
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
