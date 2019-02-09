import React, { createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

/* eslint-disable */
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

// const ConfigProvider = ({ children, value }) => <Provider value={value}>{children}</Provider>;
class ConfigProvider extends React.Component {
    constructor(props) {
        super(props);
        /* eslint-disable */
        this.state = {
            id: props.value.id,
            lots: [],
            producers: [],
            batches: [],
            transactions: []
        };
        /* eslint-enable */
    }

    componentDidMount() {
        const { id } = this.state;
        this.getLots(id);
        this.getProducers();
        // TODO Batches is not currently working
        // this.getBatches(id);
        this.getTransactions(id);
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

    getProducers = () => {
        const url = `${API_URL}/producers`;
        this.getData(url, "producers");
    };

    getBatches = id => {
        const url = `${API_URL}/roasters/${id}/batches`;
        this.getData(url, "batches");
    };

    getTransactions = id => {
        const url = `${API_URL}/roasters/${id}/transactions`;
        this.getData(url, "transactions");
    };

    render() {
        // TODO Figure out why updates are not being reported to children
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
