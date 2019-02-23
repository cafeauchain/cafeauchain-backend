import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import OpenContracts from "roaster_tools/openContracts";
import OpenRoasts from "roaster_tools/openRoasts";
import Notifier from "roaster_tools/dashboard/notifier";

import Context from "contexts/index";
/* eslint-enable */

import QuickActions from "./quickActions";

const Wrapper = ({ roaster, ...rest }) => {
    return (
        <Context
            roaster={roaster}
            requests={["transactions", "batches", { name: "activity" }, "inventory", "lots", "log", "producers"]}
        >
            <Dashboard {...rest} />
        </Context>
    );
};

const { object } = PropTypes;
Wrapper.propTypes = {
    roaster: object
};

const Dashboard = () => (
    <Container style={{ margin: "4em 0" }}>
        <Segment>
            <Header as="h1" content="Dashboard" />
        </Segment>
        {true && <Notifier />}
        <Grid doubling>
            <Grid.Column width={10} stretched>
                {true && <QuickActions />}
                <Segment>{true && <OpenRoasts />}</Segment>
            </Grid.Column>
            <Grid.Column width={6} stretched>
                <Segment>{true && <Budgeter />}</Segment>
            </Grid.Column>
        </Grid>
        <Segment>{true && <OpenContracts />}</Segment>
        <Segment>{true && <RoastLog />}</Segment>
    </Container>
);

export default Wrapper;
