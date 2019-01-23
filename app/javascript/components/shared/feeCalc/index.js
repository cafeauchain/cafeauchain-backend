import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Input } from "semantic-ui-react";

// This doesn't work but it is what I want to do
import vars from "stylesheets/variables.scss";
import "input-range-scss";

// This does work but I would prefer to import files directly into the component
// instead of into the intermediate stylesheet
import "./styles.scss"

class Fees extends Component {
    state = {};
    handleInputChange = (event, { value }) => {
        console.log(event, value);
    };
    render() {
        return (
            <Container text style={{ background: ( vars && vars.hasOwnProperty( 'text' )) ? vars.text : "brown" }}>
                <Input type="range" max="10000" min="500" step="100" onChange={this.handleInputChange} />
            </Container>
        );
    }
}
const { string } = PropTypes;
Fees.propTypes = {
    temp: string
};
export default Fees;
