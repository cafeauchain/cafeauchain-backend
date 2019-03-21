import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment, Image } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import FileUpload from "shared/fileUpload";
import Flex from "shared/flex";

import withProductForm from "wholesale/actions/productHOC";

import Variants from "wholesale/partials/variantsTable";
import Options from "wholesale/partials/optionsTable";
import CompositionTable from "wholesale/partials/compositionTable";

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
                    const items = data.reduce((obj, item) => ({ ...obj, [item.title.toLowerCase()]: item.options }), {});
                    buildDefaultVariants(items.size);
                    buildDefaultOptions(items.options);
                });
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

    onImageClick = (e,x,y,z) => {
        // TODO Add in ability to delete active_storage_attachement and active_storage_blob by id
        // eslint-disable-next-line
        console.log( e.target, e.currentTarget, e.target.dataset.id);
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
            buildInventoryOptions
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
                {current && details.product_image_urls.map( url => 
                    (
                        <React.Fragment key={url.id}>
                            <Image src={url.url} size="small" data-id={url.id} rounded inline style={{ margin: 4 }} onClick={this.onImageClick} />
                            {details.product_image_urls.length < 5 && (
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
                        </React.Fragment>
                    )
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
    successClose: func,
    current: object
};

export default withContext(withProductForm(CreateProduct));
