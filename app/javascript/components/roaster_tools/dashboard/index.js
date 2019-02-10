import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import BatchLog from "roaster_tools/batchLog";

import API_URL from "utilities/apiUtils/url";

import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as LotsProvider } from "contexts/lots";
/* eslint-enable */

import QuickActions from "./quickActions";

class Dashboard extends Component {
    onClick = (e, user) => {
        user.updateContext({ display: new Date().toString() });
    };

    render = () => {
        const { roaster } = this.props;
        const { id } = roaster;
        const contextValue = { id };
        return (
            <UserProvider value={contextValue}>
                <LotsProvider value={contextValue}>
                    <Container style={{ margin: "4em 0" }}>
                        <Segment>
                            <Header as="h1" content="Dashboard" />
                        </Segment>
                        <Grid doubling>
                            <Grid.Column width={10}>
                                <QuickActions />
                                {false && (
                                    <Segment>
                                        <BatchLog id={id} />
                                    </Segment>
                                )}
                                <Segment>
                                    <RoastLog />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Segment>{false && <Budgeter />}</Segment>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </LotsProvider>
            </UserProvider>
        );
    };
}

const { object } = PropTypes;
Dashboard.propTypes = {
    roaster: object
};
export default Dashboard;
