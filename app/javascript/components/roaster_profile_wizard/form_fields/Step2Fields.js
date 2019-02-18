import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
import Input from "shared/input";

import { usStates } from "utilities";
/* eslint-enable */

class Step2Fields extends Component {
    state = {};

    renderInputs = props => {
        const { handleChange, values } = this.props;
        return (
            <Form.Field>
                <Input {...props} onChange={handleChange} defaultValue={values[props.name]} autoComplete="off" />
            </Form.Field>
        );
    };

    searchFunc = (collection, val) => {
        return collection.filter(
            item =>
                item.value.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                item.text.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
    };

    render() {
        const { renderErrors, nextStep, previousStep } = this.props;
        const Inner = this.renderInputs;
        return (
            <Container text>
                <IconHeader iconName="coffee" header="Step 2: Location" />
                <Form style={{ margin: "4em 0" }}>
                    {renderErrors()}
                    <Form.Group widths="equal">
                        <Inner name="address_1" label="Address" placeholder="Address" />
                        <Inner name="address_2" label="Suite, PO Box, etc" placeholder="Suite, PO Box, etc" />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Inner name="city" label="City" placeholder="City" />
                        <Inner
                            name="state"
                            label="State"
                            placeholder="State"
                            inputType="select"
                            options={usStates}
                            search={this.searchFunc}
                        />
                        <Inner name="zip_code" label="Zip Code" placeholder="Zip Code" />
                    </Form.Group>
                    <Button
                        type="submit"
                        onClick={previousStep}
                        icon="left arrow"
                        labelPosition="left"
                        content="Previous Step"
                    />
                    <Button
                        primary
                        onClick={nextStep}
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        content="Next Step"
                    />
                </Form>
            </Container>
        );
    }
}

const { func, object } = PropTypes;
Step2Fields.propTypes = {
    renderErrors: func,
    handleChange: func,
    handleState: func,
    nextStep: func,
    previousStep: func,
    values: object
};

export default Step2Fields;
