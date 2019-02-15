import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
/* eslint-enable */

class AdditionalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                setAsDefault: true,
                name: props.name
            }
        };
    }

    onClick = e => {
        e.preventDefault();
        const { submitCC, closeModal } = this.props;
        const { details } = this.state;
        submitCC({ details });
        closeModal();
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };
    render() {
        const {
            details: { name }
        } = this.state;
        return (
            <div className="checkout">
                <Form onSubmit={this.onClick}>
                    <Input
                        name="name"
                        label=""
                        placeholder="Card Name"
                        onChange={this.handleInputChange}
                        defaultValue={name}
                    />
                    <br />
                    <Input
                        inputType="checkbox"
                        name="setAsDefault"
                        label="Set as Default"
                        defaultChecked
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <Button content="Submit" primary />
                </Form>
            </div>
        );
    }
}

const { func, string } = PropTypes;
AdditionalDetails.propTypes = {
    closeModal: func,
    submitCC: func,
    name: string
};

export default AdditionalDetails;
