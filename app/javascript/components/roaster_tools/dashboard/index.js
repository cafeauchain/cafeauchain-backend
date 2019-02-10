import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import BatchLog from "roaster_tools/batchLog";

import API_URL from "utilities/apiUtils/url";

import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as LotsProvider } from "contexts/lots";
import { ConfigProvider as ProducerProvider } from "contexts/producers";
/* eslint-enable */

import QuickActions from "./quickActions";

const Wrapper = ({ roaster_profile_id: id, roaster, ...rest }) => (
    <UserProvider value={{ roaster }}>
        <LotsProvider value={{ id }}>
            <ProducerProvider value={{ id }}>
                <Dashboard {...rest} />
            </ProducerProvider>
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
            <Grid.Column width={10}>
                <QuickActions />
                {false && (
                    <Segment>
                        <BatchLog />
                    </Segment>
                )}
                <Segment>
                    <RoastLog />
                </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
                <Segment>
                    <Budgeter />
                </Segment>
            </Grid.Column>
        </Grid>
    </Container>
);

export default Wrapper;
