import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Placeholder, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
/* eslint-enable */

import QuickActions from "./quickActions";

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
                    <Header as="h1" content="Dashboard" />
                </Segment>
                <Grid doubling>
                    <Grid.Column width={10}>
                        <QuickActions id={id} />
                        <Segment>
                            <RoastLog id={id} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Budgeter id={id} />
                        </Segment>
                        <Segment>
                            <Header as="h2" content="Sidebar?" />
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Segment>
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
