import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import API_URL from "utilities/apiUtils/url";
import tableDefs from "tableDefinitions/openContracts";
/* eslint-enable */

class OpenContracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        const { id } = this.props;
        this.getContracts(id);
    }

    getContracts = async id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        let response = await fetch(url);
        if (response.ok) {
            let res = await response.json();
            let { data } = res;
            this.setState({ data });
        }
    };
    render() {
        const { data } = this.state;

        return (
            <F>
                <Header as="h2" content="Open Contracts" />
                <Table tableDefs={tableDefs} data={data} />
            </F>
        );
    }
}

const { oneOfType, number, string } = PropTypes;
OpenContracts.propTypes = {
    id: oneOfType([number, string])
};

export default OpenContracts;
