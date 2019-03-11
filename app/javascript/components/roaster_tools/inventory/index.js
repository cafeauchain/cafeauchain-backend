import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import AddLots from "roaster_tools/inventory/addLots";
import SingleContract from "roaster_tools/inventory/singleContract";
import OpenContracts from "roaster_tools/openContracts";
import RecentTransactions from "roaster_tools/recentTransactions";

import Context from "contexts/index";
/* eslint-enable */

const Wrapper = ({ roaster, ...rest }) => {
    return (
        <Context roaster={roaster} requests={["transactions", "lots"]}>
            <Dashboard {...rest} />
        </Context>
    );
};
const { oneOfType, number, string, object } = PropTypes;
Wrapper.propTypes = {
    roaster_profile_id: oneOfType([number, string]),
    roaster: object
};

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

export default Wrapper;
