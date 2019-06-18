import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import ErrorHandler from "shared/errorHandler";

import fields from "defs/forms/editSingleContract";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class EditLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnLoading: false,
            lotDetails: props.lot.attributes,
            errors: []
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { lotDetails } = this.state;
        const { userId, lot } = this.props;
        const url = `${ROASTER_URL(userId)}/lots/${ lot.id }`;
        let body = { ...lotDetails };
        let response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    };

    afterSubmit = async response => {
        const { updateContext, successClose, closeModal } = this.props;
        const success = "Lot Updated!";
        await setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data] });
            } else {
                if (response.redirect) {
                    window.location = await response.redirect_url;
                } else {
                    const update = { lot: response.data };
                    if (successClose) {
                        successClose(success, updateContext, update);
                    } else if (closeModal) {
                        closeModal();
                        updateContext(update);
                    }
                }
            }
        }, 400);
    }

    renderInput(field, lotDetails) {
        // TODO Clean this up. Why is an undefined field getting passed to the component?
        let inputFields = {
            name: field.name,
            fluid: true,
            label: field.label,
            inputLabel: field.inputLabel,
            labelPosition: field.inputLabel ? "right" : undefined,
            placeholder: field.placeholder,
            onChange: this.handleInputChange,
            inputType: field.inputType
        };
        if( field.inputType === "checkbox" ){
            return (
                <Input
                    {...inputFields}
                    checked={lotDetails[field.name]}
                />
            );
        }
        return (
            <Input
                {...inputFields}
                icon={field.icon}
                iconPosition={field.icon ? "left" : undefined}
                value={lotDetails[field.name] === undefined ? "" : lotDetails[field.name]}
                type={field.type}
            />
        ); 
    }

    render() {
        const { lotDetails, btnLoading, errors } = this.state;
        return (
            <Form>
                <Flex spacing="20" wrap>
                    {fields.map(field => (
                        <div
                            key={field.name}
                            flex="50"
                            style={{
                                marginBottom: 20,
                            }}
                        >
                            {this.renderInput( field, lotDetails )}
                        </div>
                    ))}
                </Flex>
                <ErrorHandler errors={errors} />
                                
                <Button 
                    fluid
                    size="large"
                    primary
                    onClick={this.handleSubmit}
                    loading={btnLoading}
                    content="Update Lot"
                />
            </Form>
        );
    }
}

const { oneOfType, string, number, func, object } = PropTypes;
EditLot.propTypes = {
    userId: oneOfType([number, string]),
    updateContext: func,
    lot: object,
    closeModal: func,
    successClose: func
};

export default withContext(EditLot);
