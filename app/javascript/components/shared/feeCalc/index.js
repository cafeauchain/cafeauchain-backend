import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Input, Header, Card, Statistic, Grid, Image } from "semantic-ui-react";
import Commafy from "commafy";

// eslint-disable-next-line
import img from "images/coffee-imgs/coffee-img-10.jpg";

import "./styles.scss";

/* eslint-disable */
import roasterCostCalc from "utilities/roasterCostCalc";

const description =
    "At Cafe au Chain, your cost is completely determined by how much you roast per month. We don't arbitrarily limit the capabilities of the platform based on how big or small of a roaster you are. No limits on employees or accounts or locations. The amount you roast determines the amount you pay. The base package includes up to 500 pounds roasted per month. After that, its $2 per 100 pounds. Use the slider below to estimate your monthly bill.";
/* eslint-enable */

const FeeGrid = props => {
    const { poundage, price } = props;
    return (
        <Grid divided columns="equal">
            <Grid.Column textAlign="center">
                <Statistic value={Commafy(poundage)} label="pounds roasted" />
            </Grid.Column>
            <Grid.Column textAlign="center">
                <Statistic value={<Statistic.Value className="primary-text" content={price} />} label="Total Cost" />
            </Grid.Column>
        </Grid>
    );
};

const CardImage = () => (
    <Image
        floated="right"
        size="small"
        src={img}
        rounded
        bordered
        style={{ marginBottom: 20, marginLeft: 60, marginRight: 20 }}
    />
);

const RangeInput = props => (
    <Input {...props} type="range" max="10000" min="500" step="100" fluid className="no-padding" defaultValue="500" />
);

class Fees extends Component {
    state = {
        value: "500"
    };
    handleInputChange = (event, { value }) => this.setState({ value });
    render() {
        const { value } = this.state;
        return (
            <Container text>
                <Card centered fluid>
                    <Card.Content>
                        <Card.Header>Pricing</Card.Header>
                        <Card.Description>
                            <CardImage />
                            {description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Header as="h2" content="Monthly Amounts" textAlign="center" block />
                        <FeeGrid poundage={value} price={roasterCostCalc(value)} />
                    </Card.Content>
                    <Card.Content>
                        <RangeInput onChange={this.handleInputChange} />
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}
const { string } = PropTypes;
FeeGrid.propTypes = {
    price: string,
    poundage: string
};
export default Fees;
