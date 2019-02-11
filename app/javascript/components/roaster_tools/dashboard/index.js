import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import OpenContracts from "roaster_tools/openContracts";
import OpenRoasts from "roaster_tools/openRoasts";

import API_URL from "utilities/apiUtils/url";

import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as LotsProvider } from "contexts/lots";
import { ConfigProvider as ProducerProvider } from "contexts/producers";
import { ConfigProvider as BatchesProvider } from "contexts/batches";
import { ConfigProvider as ActivityProvider } from "contexts/activity";
/* eslint-enable */

import QuickActions from "./quickActions";

const Wrapper = ({ roaster_profile_id: id, roaster, ...rest }) => (
    <UserProvider value={{ roaster }}>
        <LotsProvider value={{ id }} url={`${API_URL}/roasters/${id}/lots`}>
            <BatchesProvider value={{ id }} url={`${API_URL}/roasters/${id}/batches`}>
                <ActivityProvider value={{ id }} url={`${API_URL}/roasters/${id}/subscriptions`}>
                    <ProducerProvider value={{ id }} url={`${API_URL}/producers`}>
                        <Dashboard {...rest} />
                    </ProducerProvider>
                </ActivityProvider>
            </BatchesProvider>
        </LotsProvider>
    </UserProvider>
);

const { oneOfType, number, string, object } = PropTypes;

Wrapper.propTypes = {
    roaster_profile_id: oneOfType([number, string]),
    roaster: object
};

const Dashboard = () => (
    <Container style={{ margin: "4em 0" }}>
        <Segment>
            <Header as="h1" content="Dashboard" />
        </Segment>
        <Grid doubling>
            <Grid.Column width={10} stretched>
                <QuickActions />
                <Segment>
                    <OpenRoasts />
                </Segment>
            </Grid.Column>
            <Grid.Column width={6} stretched>
                <Segment>
                    <Budgeter />
                </Segment>
            </Grid.Column>
        </Grid>
        <Segment>
            <OpenContracts />
        </Segment>
        <Segment>
            <RoastLog />
        </Segment>
    </Container>
);

export default Wrapper;
