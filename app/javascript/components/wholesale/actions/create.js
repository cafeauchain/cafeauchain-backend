import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import withProductForm from "wholesale/actions/productHOC";

import Variants from "wholesale/partials/variants";
import Composition from "wholesale/partials/composition";

import fields from "defs/forms/createProduct";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>{ctx => <CreateProduct {...props} userId={ctx.userId} inventory={ctx.inventory} />}</Context>
);

class CreateProduct extends Component {
    state = {
        btnLoading: false,
        errors: []
    };
    componentDidMount() {
        const { inventory, getCtxData } = this.props;
        if (inventory === undefined) {
            getCtxData("inventory");
        }
    }

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const {
            details,
            userId,
            getCtxData,
            funcs: { resetForm },
            closeModal,
            successClose
        } = this.props;
        const url = `${ROASTER_URL(userId)}/products`;
        let body = { ...details };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                const success = details.name + " was created successfully!";
                await this.setState({ btnLoading: false });
                await resetForm();
                getCtxData("products");
                getCtxData("variants");
                getCtxData("inventory");
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    setTimeout(closeModal, 900);
                }
            }
        }
    };

    render() {
        const { inventory = [], funcs, details } = this.props;
        const { btnLoading, errors } = this.state;
        const {
            handleInputChange,
            validateInputs,
            removeButton,
            addVariant,
            addInventoryItem,
            buildInventoryOptions
        } = funcs;
        const inventoryOptions = buildInventoryOptions(inventory);
        const { composition, variants } = details;
        const btnActive = validateInputs(details);
        return (
            <F>
                <Form>
                    <ErrorHandler errors={errors} />
                    {fields.base.map(({ name, label, inputType }) => (
                        <Input
                            key={name}
                            name={name}
                            label={label}
                            inputType={inputType}
                            onChange={handleInputChange}
                            value={details[name]}
                        />
                    ))}
                    <Segment style={{ background: "#dedede" }}>
                        <Variants
                            variants={variants}
                            fields={fields.variants}
                            handleChange={handleInputChange}
                            btn={removeButton}
                        />
                        <Button type="button" color="blue" content="Add Variant" onClick={addVariant} />
                    </Segment>
                    <Segment style={{ background: "#dedede" }}>
                        <Composition
                            composition={composition}
                            fields={fields.composition}
                            inventoryOptions={inventoryOptions}
                            handleChange={handleInputChange}
                            btn={removeButton}
                        />
                        <Button type="button" color="blue" content="Add Product" onClick={addInventoryItem} />
                    </Segment>
                    <Button
                        primary
                        fluid
                        loading={btnLoading}
                        disabled={!btnActive}
                        onClick={this.handleSubmit}
                        content="Create Product"
                    />
                </Form>
            </F>
        );
    }
}

const { array, object, func, string, number, oneOfType } = PropTypes;
CreateProduct.propTypes = {
    userId: oneOfType([string, number]),
    inventory: array,
    details: object,
    funcs: object,
    getCtxData: func,
    closeModal: func,
    successClose: func
};

export default withProductForm(Wrapper);