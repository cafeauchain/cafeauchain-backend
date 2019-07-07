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

const onboardingFields = [
    { name: "roasted_on_import", label: "Roasted to Date", inputLabel: "lbs", type: "number" }
];

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

    handleDelete = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        const { userId, lot } = this.props;
        const url = `${ROASTER_URL(userId)}/lots/${lot.id}`;
        let response = await requester({ url, method: 'DELETE' });
        this.afterSubmit(response, true);
    }

    afterSubmit = async (response, isDelete) => {
        const { updateContext, successClose, closeModal, getData } = this.props;
        const success = isDelete ? "Lot Deleted!" : "Lot Updated!";
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
                        if( isDelete ){
                            successClose(success, getData, "lots" );
                        } else {
                            await getData("lots");
                            successClose(success, updateContext, update);
                        }
                    } else if (closeModal) {
                        if( isDelete ){
                            await getData("lots");
                            closeModal();
                        } else {
                            closeModal();
                            updateContext(update);
                        }
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
        const { onboarding } = this.props;
        const { lotDetails, btnLoading, errors } = this.state;
        return (
            <Form>
                <Flex spacing="20" wrap>
                    {fields.concat(onboarding ? onboardingFields : []).map(field => (
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
                <Flex spacing="20" centercross spacebetween>
                    <div flex="auto">
                        {lotDetails.can_delete && (
                            <Button
                                negative
                                onClick={this.handleDelete}
                                content="Delete Lot"
                            />
                        )}
                        
                    </div>
                    <div flex="auto">
                        <Button
                            size="large"
                            primary
                            onClick={this.handleSubmit}
                            loading={btnLoading}
                            content="Update Lot"
                        />
                    </div>
                    
                    
                </Flex>
            </Form>
        );
    }
}

const { oneOfType, string, number, func, object, bool } = PropTypes;
EditLot.propTypes = {
    userId: oneOfType([number, string]),
    updateContext: func,
    lot: object,
    closeModal: func,
    successClose: func,
    getData: func,
    onboarding: bool
};

export default withContext(EditLot);
