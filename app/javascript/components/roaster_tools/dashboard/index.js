import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import OpenContracts from "roaster_tools/openContracts";
import OpenRoasts from "roaster_tools/openRoasts";
/* eslint-enable */

import QuickActions from "./quickActions";
import Notifier from "./notifier";

const Dashboard = () => (
    <div>
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
    </div>
);

export default Dashboard;
