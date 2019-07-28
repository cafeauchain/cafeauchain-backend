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
/* eslint-enable */

class CreateProduct extends Component {
    componentDidMount() {
        const {
            inventory,
            getData,
            userId,
            funcs: { buildDefaultVariants, buildDefaultOptions },
            current
        } = this.props;
        if (inventory === undefined) getData("inventory");
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

    handleSubmit = async (ev, { method }) => {
        ev.preventDefault();
        const { details, userId, funcs: { updateHOCState } } = this.props;
        await updateHOCState({ btnLoading: true });
        const productId = method === "PUT" ? "/" + details.id : "";
        const url = `${ROASTER_URL(userId)}/products${ productId }`;
        const body = { ...details };
        const response = await requester({ url, body, method });
        setTimeout(() => this.afterSubmit(response, url, method), 400);
    };

    afterSubmit = async (response, url, method) => {
        const { 
            details, 
            getData,
            funcs: { updateHOCState },
            closeModal,
            successClose
        } = this.props;
        if (response instanceof Error) {
            updateHOCState({ errors: response.response.data, btnLoading: false });
        } else {
            const { id: productId } = response.data;
            const imgUrl = method === "PUT" ? url : url + "/" + productId;
            await this.handleImages(details, imgUrl);
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                const success = details.name + " was created successfully!";
                await updateHOCState({ btnLoading: false });
                getData("products");
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
        const { inventory = [], funcs, details, current, btnLoading, errors } = this.props;
        const {
            handleInputChange,
            validateInputs,
            removeButton,
            addVariant,
            addInventoryItem,
            setOptions,
            onRemove
        } = funcs;
        const { composition, variants, product_options: options } = details;
        const btnActive = validateInputs(details);
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Flex spacing="10" wrap>
                    <div flex="75">
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
                    </div>
                    <div flex="25">
                        <Segment>
                            <p><strong>Product Status</strong></p>
                            {fields.status.map(({ label, value }) => (
                                <Input
                                    key={label}
                                    inputType="checkbox"
                                    name="status"
                                    label={label}
                                    value={value}
                                    checked={details["status"] === value}
                                    onChange={handleInputChange}
                                />
                            ))}
                        </Segment>
                    </div>
                </Flex>
                
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
                        inventory={inventory}
                        handleChange={handleInputChange}
                        btn={removeButton}
                    />
                    <Button type="button" color="blue" content="Add Roast Profile" onClick={addInventoryItem} />
                </Segment>
                <Segment style={{ background: "#efefef" }}>
                    <Flex spacing="10">
                        <div flex="auto">
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
                    onClick={this.handleSubmit}
                    method={current ? "PUT" : "POST"}
                    content={current ? "Update Product" : "Create Product"}
                />
            </Form>
        );
    }
}

const { array, object, func, string, number, oneOfType, bool } = PropTypes;
CreateProduct.propTypes = {
    userId: oneOfType([string, number]),
    inventory: array,
    details: object,
    funcs: object,
    getData: func,
    closeModal: func,
    successClose: func,
    current: object,
    btnLoading: bool,
    errors: array
};

export default withProductForm(CreateProduct);
