import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

// eslint-disable-next-line
import urls from "contexts/urls";

class ConfigProvider extends React.Component {
    constructor(props) {
        super(props);
        const datasets = props.requests.reduce((obj, request) => {
            if (typeof request === "string") {
                return { ...obj, [request]: [] };
            }
            return { ...obj, [request.name]: {} };
        }, {});
        let initData = {};
        const { data: init } = props;
        for (let key in init) {
            if (init[key]) {
                initData[key] = init[key].data ? init[key].data : init[key];
            }
        }
        this.state = {
            userId: props.id,
            // updateContext: this.updateContext,
            // loading: true,
            ...datasets,
            ...initData
            // getData: this.getData
        };
    }

    componentDidMount() {
        const { requests } = this.props;
        requests.map(request => (request.name ? this.getData(request.name) : this.getData(request)));
    }

    // TODO I should probably handle the initial loading better somehow
    // componentDidUpdate() {
    //     const { loading } = this.state;
    //     if (loading) {
    //         // eslint-disable-next-line
    //         setTimeout(() => this.setState({ loading: false }, console.log("updating loader")), 600);
    //     }
    // }

    updateContext = stateObj => {
        // this.setState({ loading: true }, this.setState(stateObj));
        this.setState(stateObj);
    };

    getData = async request => {
        const { id } = this.props;
        const response = await fetch(urls(id)[request]);
        const { data } = await response.json();
        // this.setState({ [request]: data });
        this.updateContext({ [request]: data });
    };

    render() {
        const { children } = this.props;
        return (
            <Provider value={{ ...this.state, getData: this.getData, updateContext: this.updateContext }}>
                {children}
            </Provider>
        );
    }
}

const { node, oneOfType, number, string, array, object } = PropTypes;
ConfigProvider.propTypes = {
    id: oneOfType([number, string]),
    requests: array,
    children: node,
    data: object
};

export { ConfigProvider };

export default Consumer;
