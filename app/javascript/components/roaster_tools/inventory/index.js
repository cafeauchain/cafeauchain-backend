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
    state = {};
    render = () => {
        const { roaster_profile_id: id } = this.props;
        const contextValue = { id };
        return (
            <ConfigProvider value={contextValue}>
                <Container style={{ margin: "4em 0" }}>
                    <Segment>
                        <Header as="h1" content="Manage Inventory" />
                    </Segment>
                    <Grid doubling columns={2}>
                        <Grid.Column width={10}>
                            <Segment>
                                <OpenContracts />
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
