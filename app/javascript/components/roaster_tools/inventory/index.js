import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

import AddLots from "./addLots";
import SingleContract from "./singleContract";
import OpenContracts from "../openContracts";
import RecentTransactions from "../recentTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render = () => {
        const { roaster_profile_id: id } = this.props;
        return (
            <Container style={{ margin: "4em 0" }}>
                <Segment>
                    <Header as="h1" content="Manage Inventory" />
                </Segment>
                <Grid>
                    <Grid.Column width={10}>
                        <Segment>
                            <OpenContracts id={id} />
                            <RecentTransactions />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <SingleContract id={id} />
                        <AddLots id={id} />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    };
}

const { oneOfType, number, string } = PropTypes;
Dashboard.propTypes = {
    roaster_profile_id: oneOfType([number, string])
};
export default Dashboard;
