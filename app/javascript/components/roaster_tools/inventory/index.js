import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import AddLots from "roaster_tools/inventory/addLots";
import SingleContract from "roaster_tools/inventory/singleContract";
import OpenContracts from "roaster_tools/openContracts";
import RecentTransactions from "roaster_tools/recentTransactions";

/* eslint-enable */

const Dashboard = () => (
    <div>
        <Segment>
            <Header as="h1" content="Manage Inventory" />
        </Segment>
        <Grid doubling columns={2}>
            <Grid.Column width={10}>
                <Segment>{true && <OpenContracts />}</Segment>
                <Segment>{true && <RecentTransactions />}</Segment>
            </Grid.Column>
            <Grid.Column width={6}>{true && <AddLots />}</Grid.Column>
        </Grid>
    </div>
);

export default Dashboard;
