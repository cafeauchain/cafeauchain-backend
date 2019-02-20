import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import OpenContracts from "roaster_tools/openContracts";
import Inventory from "wholesale/inventory";

import { roasterUrl as ROASTER_URL, url as API_URL } from "utilities/apiUtils";

import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as TrxProvider } from "contexts/transactions";
import { ConfigProvider as LotsProvider } from "contexts/lots";
import { ConfigProvider as ProducerProvider } from "contexts/producers";
import { ConfigProvider as RoastedProvider } from "contexts/roasted";
/* eslint-enable */

const Wrapper = ({ roaster, ...rest }) => (
    <UserProvider value={{ roaster }}>
        <TrxProvider value={{ id: roaster.id }} url={`${ROASTER_URL(roaster.id)}/transactions`}>
            <LotsProvider value={{ id: roaster.id }} url={`${ROASTER_URL(roaster.id)}/lots`}>
                <ProducerProvider value={{ id: roaster.id }} url={`${API_URL}/producers`}>
                    <RoastedProvider value={{ id: roaster.id }} url={`${ROASTER_URL(roaster.id)}/inventory_items`}>
                        <Dashboard {...rest} />
                    </RoastedProvider>
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
            <Header as="h1" content="Manage Wholesale" />
        </Segment>
        <Segment>{true && <Inventory />}</Segment>
        <Segment>{true && <OpenContracts />}</Segment>
    </Container>
);

export default Wrapper;
