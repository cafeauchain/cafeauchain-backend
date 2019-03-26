import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import FileUpload from "shared/fileUpload";
import Flex from "shared/flex";

import withProductForm from "wholesale/actions/productHOC";

import Variants from "wholesale/partials/variantsTable";
import Options from "wholesale/partials/optionsTable";
import CompositionTable from "wholesale/partials/compositionTable";
import DeleteImage from "wholesale/actions/deleteImages";

import fields from "defs/forms/createProduct";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

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
            funcs: { buildDefaultVariants, buildDefaultOptions },
            current
        } = this.props;
        if (inventory === undefined) getCtxData("inventory");
        if( !current ){
            fetch(ROASTER_URL(userId) + "/default_options")
                .then(response => response.json())
                .then(data => {
                    const items = data.reduce((obj, item) => (
                        { ...obj, [item.title.toLowerCase()]: item.options }), {}
                    );
                    buildDefaultVariants(items.size);
                    buildDefaultOptions(items.options);
                });
        }
        
    }

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { details, userId } = this.props;
        const url = `${ROASTER_URL(userId)}/products`;
        const body = { ...details };
        const response = await requester({ url, body });
        this.afterSubmit( response, url );
    };

    handleUpdate = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { details, userId } = this.props;
        const url = `${ROASTER_URL(userId)}/products/` + details.id;
        const body = { ...details };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response, url);
    }

    afterSubmit = async (response, url) => {
        const { 
            details, 
            getCtxData,
            funcs: { resetForm },
            closeModal,
            successClose
        } = this.props;
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            const { id: productId } = response.data;
            await this.handleImages(details, url + "/" + productId);
            if (response.redirect) {
                window.location.href = await response.redirect_url;
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
    }

    handleImages = async (details, url) => {
        const hasAttachments = details.hasOwnProperty("product_images") && details.product_images.length > 0;
        if (hasAttachments) {
            let formData = new FormData();
            details.product_images.forEach(file => formData.append("product_images[]", file));
            await requester({ url: url + "/add_images", body: formData, noContentType: true });
        }
    }

    render() {
        const { inventory = [], funcs, details, current } = this.props;
        const { btnLoading, errors } = this.state;
        const {
            handleInputChange,
            validateInputs,
            removeButton,
            addVariant,
            addInventoryItem,
            setOptions,
            buildInventoryOptions,
            onRemove
        } = funcs;
        const inventoryOptions = buildInventoryOptions(inventory);
        const { composition, variants, product_options: options } = details;
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
                        autoComplete="off"
                    />
                ))}
                {current && details.product_image_urls.map( (url,idx) => 
                    (
                        <React.Fragment key={url.id}>
                            <DeleteImage 
                                url={url.url} 
                                id={url.id} 
                                onRemove={onRemove}
                                idx={idx}
                                remover='product_image_urls'
                            />
                        </React.Fragment>
                    )
                )}
                {current && details.product_image_urls.length < 5 && (
                    <FileUpload
                        fileType="fileImage"
                        label="Upload Product Images"
                        id="product_images_modal"
                        name="product_images"
                        handleChange={handleInputChange}
                        multiple={5}
                        files={details["product_images"] || []}
                    />
                )}
                {!current && (
                    <FileUpload
                        fileType="fileImage"
                        label="Upload Product Images"
                        id="product_images"
                        name="product_images"
                        handleChange={handleInputChange}
                        multiple={5}
                        files={details["product_images"] || []}
                    />
                )}
                

                <Segment>
                    <CompositionTable
                        composition={composition}
                        fields={fields.composition}
                        inventoryOptions={inventoryOptions}
                        handleChange={handleInputChange}
                        btn={removeButton}
                    />
                    <Button type="button" color="blue" content="Add Roast Profile" onClick={addInventoryItem} />
                </Segment>
                <Segment style={{ background: "#efefef" }}>
                    <Flex spacing="10">
                        <div flex="fill">
                            <Variants
                                variants={variants}
                                fields={fields.variants}
                                handleChange={handleInputChange}
                                btn={removeButton}
                            />
                            <Button type="button" color="blue" content="Add Variant" onClick={addVariant} />
                        </div>
                        <div flex="fill">
                            <Options
                                options={options}
                                handleChange={handleInputChange}
                                btn={removeButton}
                                setOptions={setOptions}
                            />
                        </div>
                    </Flex>
                </Segment>
                <Button
                    primary
                    fluid
                    loading={btnLoading}
                    disabled={current ? false : !btnActive}
                    onClick={current ? this.handleUpdate : this.handleSubmit}
                    content={current ? "Update Product" : "Create Product"}
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
    successClose: func,
    current: object
};

export default withContext(withProductForm(CreateProduct));
