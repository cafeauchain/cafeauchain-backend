import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Input, Header, Card, Statistic, Grid, Image } from "semantic-ui-react";
import Commafy from "commafy";

import "./styles.scss";

/* eslint-disable */
import img from "images/coffee-imgs/coffee-img-10.jpg";
import roasterCostCalc from "utilities/roasterCostCalc";
import Flex from "shared/flex"

import { Money } from "shared/textFormatters";

const description = `At Cafe au Chain, your cost is completely determined by how much you roast per month. 
    We don't arbitrarily limit the capabilities of the platform based on how big or small of a roaster you are. 
    No limits on employees or accounts or locations. The amount you roast determines the amount you pay. 
    The base package includes up to 500 pounds roasted per month. After that, its $2 per 100 pounds. 
    Use the slider below to estimate your monthly bill.`;
/* eslint-enable */

const FeeGrid = props => {
    const { poundage, price } = props;
    return (
        <Flex spacing="20" wrap centermain>
            <div flex="50" className="roasted-calc">
                <Statistic value={Commafy(poundage)} label="pounds roasted" />
            </div>
            <div flex="50" className="roasted-calc">
                <Statistic
                    value={<Statistic.Value content={<Money type="positive">{price}</Money>} />}
                    label="Total Cost"
                />
            </div>
        </Flex>
    );
};

const CardImage = () => (
    <Image
        floated="right"
        size="small"
        src={img}
        rounded
        bordered
        className="calc-image"
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
