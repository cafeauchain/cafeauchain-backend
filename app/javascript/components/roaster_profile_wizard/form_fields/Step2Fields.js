import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";

import { usStates } from "utilities";
/* eslint-enable */

class Step2Fields extends Component {
    renderInputs = props => {
        const { handleChange, values } = this.props;
        return <Input {...props} onChange={handleChange} defaultValue={values[props.name]} autoComplete="off" />;
    };

    searchFunc = (collection, val) => {
        return collection.filter(
            item =>
                item.value.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                item.text.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
    };

    render() {
        const Inner = this.renderInputs;
        return (
            <F>
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
            </F>
        );
    }
}

const { func, object } = PropTypes;
Step2Fields.propTypes = {
    handleChange: func,
    values: object
};

export default Step2Fields;
