import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import AddLots from "roaster_tools/inventory/addLots";
import SingleContract from "roaster_tools/inventory/singleContract";
import OpenContracts from "roaster_tools/openContracts";
import RecentTransactions from "roaster_tools/recentTransactions";

import API_URL from "utilities/apiUtils/url";

import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as TrxProvider } from "contexts/transactions";
import { ConfigProvider as LotsProvider } from "contexts/lots";
import { ConfigProvider as ProducerProvider } from "contexts/producers";
/* eslint-enable */

const Wrapper = ({ roaster_profile_id: id, roaster, ...rest }) => (
    <UserProvider value={{ roaster }}>
        <TrxProvider value={{ id }} url={`${API_URL}/roasters/${id}/transactions`}>
            <LotsProvider value={{ id }} url={`${API_URL}/roasters/${id}/lots`}>
                <ProducerProvider value={{ id }} url={`${API_URL}/producers`}>
                    <Dashboard {...rest} />
                </ProducerProvider>
            </LotsProvider>
        </TrxProvider>
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
            <Header as="h1" content="Manage Inventory" />
        </Segment>
        <Grid doubling columns={2}>
            <Grid.Column width={10}>
                <Segment>{true && <OpenContracts />}</Segment>
                <Segment>{true && <RecentTransactions />}</Segment>
            </Grid.Column>
            <Grid.Column width={6}>{false && <AddLots />}</Grid.Column>
        </Grid>
    </Container>
);

export default Wrapper;
