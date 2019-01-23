import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Input } from "semantic-ui-react";

// This doesn't work but it is what I want to do
// import vars from "stylesheets/variables.scss";
// import "input-range-scss";

// This does work but I would prefer to import files directly into the component
// instead of into the intermediate stylesheet
import "./styles.scss";

class Fees extends Component {
    state = {
        value: 500
    };
    calculateCost = value => {
        let cost = "$" + ((value - 500) * 0.02 + 19.99).toFixed(2);
        return cost;
    };
    handleInputChange = (event, { value }) => this.setState({ value });
    render() {
        const { value } = this.state;
        return (
            <Container text>
                <div>
                    <span>{value}</span>
                    <span> lb roasted per month</span>
                </div>
                <div>
                    <span>Total Cost: </span>
                    <span>{this.calculateCost(value)}</span>
                </div>
                <Input
                    type="range"
                    max="10000"
                    min="500"
                    step="100"
                    onChange={this.handleInputChange}
                    fluid
                    className="no-padding"
                    defaultValue="500"
                />
            </Container>
        );
    }
}
const { string } = PropTypes;
Fees.propTypes = {
    temp: string
};
export default Fees;
