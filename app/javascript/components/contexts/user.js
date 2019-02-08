import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

/* eslint-disable */
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

class ConfigProvider extends Component {
    state = {
        lots: [],
        producers: [],
        batches: []
    };
    componentDidMount() {
        const { value } = this.props;
        const { id } = value;
        this.getLots(id);
        this.getProducers();
        // TODO Batches is not currently working
        // this.getBatches(id);
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

    render() {
        let { children, value } = this.props;
        value = { ...value, ...this.state };
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
