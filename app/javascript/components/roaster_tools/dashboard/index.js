import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Placeholder, Segment } from "semantic-ui-react";

/* eslint-disable */
import Budgeter from "roaster_tools/budgeter";
import RoastLog from "roaster_tools/roastLog";
import BatchLog from "roaster_tools/batchLog";

import { ConfigProvider } from "contexts/user";
/* eslint-enable */

import QuickActions from "./quickActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    refreshParent = () => {
        // eslint-disable-next-line
        console.log("refreshing Parent");
        // eslint-disable-next-line
        this.setState({ timestamp: new Date() });
    };

    render = () => {
        const { roaster_profile_id: id } = this.props;
        return (
            <ConfigProvider value={{ id }}>
                <Container style={{ margin: "4em 0" }}>
                    <Segment>
                        <Header as="h1" content="Dashboard" />
                    </Segment>
                    <Grid doubling>
                        <Grid.Column width={10}>
                            <QuickActions refreshParent={this.refreshParent} />
                            {false && (
                                <Segment>
                                    <BatchLog id={id} />
                                </Segment>
                            )}
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
            </ConfigProvider>
        );
    };
}

const { oneOfType, number, string } = PropTypes;
Dashboard.propTypes = {
    roaster_profile_id: oneOfType([number, string])
};
export default Dashboard;
