import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import { usStates } from "utilities";
/* eslint-enable */

class Addresses extends Component {
    searchFunc = (collection, val) => {
        return collection.filter(
            item =>
                item.value.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                item.text.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
    };
    render() {
        const {
            onChange,
            details: { street_1, street_2, city, postal_code, state }
        } = this.props;
        return (
            <F>
                <Form.Group inline widths="equal">
                    <Input label="Address 1" value={street_1} name="street_1" onChange={onChange} />
                    <Input label="Address 2" value={street_2} name="street_2" onChange={onChange} />
                </Form.Group>

                <Form.Group inline widths="equal">
                    <Input label="City" value={city} onChange={onChange} />
                    <Input
                        inputType="select"
                        label="State"
                        value={state}
                        options={usStates}
                        onChange={onChange}
                        search={this.searchFunc}
                        selectOnBlur
                    />
                    <Input 
                        label="Zip"
                        value={postal_code}
                        name="postal_code"
                        onChange={onChange}
                        autoComplete="nocomplete"
                    />
                </Form.Group>
            </F>
        );
    }
}

const { object, func } = PropTypes;
Addresses.propTypes = {
    details: object,
    onChange: func
};

export default Addresses;
