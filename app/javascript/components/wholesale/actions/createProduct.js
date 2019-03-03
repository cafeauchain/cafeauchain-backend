import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import FileUpload from "shared/fileUpload";

import withProductForm from "wholesale/actions/productHOC";

import Variants from "wholesale/partials/variantsTable";
import CompositionTable from "wholesale/partials/compositionTable";

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
        const {
            inventory,
            getCtxData,
            userId,
            funcs: { buildDefaultVariants }
        } = this.props;
        if (inventory === undefined) getCtxData("inventory");
        fetch(ROASTER_URL(userId) + "/default_options")
            .then(response => response.json())
            .then(data => {
                const items = data.reduce((obj, item) => ({ ...obj, [item.title.toLowerCase()]: item.options }), {});
                buildDefaultVariants(items.sizes);
            });
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
        const body = { ...details };
        const respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            const hasAttachments = details.hasOwnProperty("product_images") && details.product_images.length > 0;
            if (hasAttachments) {
                let formData = new FormData();
                details.product_images.forEach(file => formData.append("product_images[]", file));
                const { id: productId } = respJSON.data;
                await requester({ url: url + "/" + productId + "/add_images", body: formData, noContentType: true });
            }
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
                <FileUpload
                    fileType="file"
                    label="Upload Product Images"
                    id="product_images"
                    name="product_images"
                    handleChange={handleInputChange}
                    multiple
                    files={details["product_images"]}
                />

                <Segment>
                    <CompositionTable
                        composition={composition}
                        fields={fields.composition}
                        inventoryOptions={inventoryOptions}
                        handleChange={handleInputChange}
                        btn={removeButton}
                    />
                    <Button type="button" color="blue" content="Add Product" onClick={addInventoryItem} />
                </Segment>

                <Segment style={{ background: "#efefef" }}>
                    <Variants
                        variants={variants}
                        fields={fields.variants}
                        handleChange={handleInputChange}
                        btn={removeButton}
                    />
                    <Button type="button" color="blue" content="Add Variant" onClick={addVariant} />
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
