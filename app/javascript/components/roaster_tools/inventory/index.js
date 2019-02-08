import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import AddLots from "roaster_tools/inventory/addLots";
import SingleContract from "roaster_tools/inventory/singleContract";
import OpenContracts from "roaster_tools/openContracts";
import RecentTransactions from "roaster_tools/recentTransactions";

import API_URL from "utilities/apiUtils/url";

import { ConfigProvider } from "contexts/user";
/* eslint-enable */

class Dashboard extends Component {
    constructor(props) {
        super(props);
        /* eslint-disable */
        this.state = {
            lots: [],
            producers: [],
            batches: []
        };
        /* eslint-enable */
    }

    componentDidMount() {
        const { roaster_profile_id: id } = this.props;
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
    render = () => {
        const { roaster_profile_id: id } = this.props;
        const contextValue = { id, ...this.state };
        return (
            <ConfigProvider value={contextValue}>
                <Container style={{ margin: "4em 0" }}>
                    <Segment>
                        <Header as="h1" content="Manage Inventory" />
                    </Segment>
                    <Grid doubling columns={2}>
                        <Grid.Column width={10}>
                            <Segment>
                                <OpenContracts id={id} />
                                <RecentTransactions id={id} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <SingleContract id={id} />
                            <AddLots id={id} />
                        </Grid.Column>
                    </Grid>
                </Container>
            </ConfigProvider>
        );
    };
}

const { oneOfType, number, string } = PropTypes;
Dashboard.propTypes = {
    roaster_profile_id: oneOfType([number, string])
};
export default Dashboard;
