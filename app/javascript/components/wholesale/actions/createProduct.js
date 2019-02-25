import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Flex from "shared/flex";

import { noEmpties } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <CreateProduct
                {...props}
                id={ctx.userId}
                updateContext={ctx.updateContext}
                inventoryData={ctx.inventory}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

const defaultDetails = {
    name: "",
    description: "",
    categories: [],
    product_images: [],
    composition: [{ inventory_item_id: null, pct: null }],
    variants: [{ size: null, price_in_cents: null }]
};
class CreateProduct extends Component {
    constructor(props) {
        super(props);
        const details = props.item ? this.buildDetailsFromItem(props.item) : defaultDetails;
        this.state = {
            details,
            btnLoading: false,
            errors: []
        };
    }

    componentDidMount() {
        const { inventoryData, getCtxData } = this.props;
        if (inventoryData === undefined) {
            getCtxData("inventory");
        }
    }

    buildDetailsFromItem = ({ attributes }) => {
        return {
            name: attributes.title,
            description: attributes.description,
            composition: attributes.composition.map(comp => ({ inventory_item_id: comp.id.toString(), pct: comp.pct }))
        };
    };

    handleInputChange = (event, { value, name, checked, object, index }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (object && index !== undefined) {
            details[object][index][name] = val;
        } else {
            details[name] = val;
        }
        this.setState({ details, errors: [] });
    };

    startSubmit = ev => {
        ev.preventDefault();
        this.setState({ btnLoading: true }, this.handleSubmit);
    };

    handleSubmit = async () => {
        const { details } = this.state;
        const { id, getCtxData, item } = this.props;
        const method = item ? "PUT" : "POST";
        const product_id_url = item ? "/" + item.id : "";
        const url = `${ROASTER_URL(id)}/products${product_id_url}`;
        let body = { ...details };
        let respJSON = await requester({ url, body, method });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                await this.setState({ btnLoading: false });
                getCtxData("products");
                getCtxData("variants");
                getCtxData("inventory");
            }
        }
    };

    buildInventoryOptions = inventory =>
        inventory.map(({ id, attributes: { name, lot_name } }) => ({
            value: id,
            text: name + " (" + lot_name + ")",
            key: id,
            id,
            name
        }));

    renderComposition = (composition, inventoryOptions) => {
        const { item: details } = this.props;
        return composition.map((item, idx) => {
            return (
                // eslint-disable-next-line
                <div key={idx} flex="50" style={{ padding: 10, flexGrow: 0 }}>
                    <Header as="h4" content={"Inventory Item " + (idx + 1)} />
                    <Input
                        inputType="select"
                        options={inventoryOptions}
                        onChange={this.handleInputChange}
                        name="inventory_item_id"
                        object="composition"
                        index={idx}
                        label="Choose Inventory Item"
                        defaultValue={details ? item.inventory_item_id.toString() : null}
                    />
                    <Input
                        name="pct"
                        object="composition"
                        index={idx}
                        type="number"
                        min="0"
                        max="100"
                        label="Composition %"
                        onChange={this.handleInputChange}
                        defaultValue={item.pct}
                    />
                </div>
            );
        });
    };

    addInventoryItem = () => {
        let { details } = this.state;
        const comp = { inventory_item_id: null, pct: null };
        details.composition = [...details.composition, comp];
        this.setState({ details });
    };

    renderVariants = variants => {
        return variants.map((item, idx) => {
            return (
                // eslint-disable-next-line
                <div key={idx} flex="50" style={{ padding: 10, flexGrow: 0 }}>
                    <Header as="h4" content={"Variant " + (idx + 1)} />
                    <Input
                        onChange={this.handleInputChange}
                        name="size"
                        object="variants"
                        index={idx}
                        type="number"
                        label="Size (in ounces)"
                        step={0.1}
                    />
                    <Input
                        name="price_in_cents"
                        object="variants"
                        index={idx}
                        type="number"
                        label="Price"
                        onChange={this.handleInputChange}
                        step={0.01}
                    />
                </div>
            );
        });
    };

    addVariant = () => {
        let { details } = this.state;
        const variant = { size: null, price_in_cents: null };
        details.variants = [...details.variants, variant];
        this.setState({ details });
    };

    validateInputs = (details, item) => {
        const { composition, variants, ...rest } = details;
        const itemDetail = item ? this.buildDetailsFromItem(item) : {};
        const compEmpties = composition.filter(item => noEmpties(item));
        const compTotal = composition.reduce((total, item) => {
            return total + Number(item.pct);
        }, 0);

        const varEmpties = variants ? variants.filter(item => noEmpties(item)) : [true];
        // TODO I hate doing this. Figure out why they are evaluating to not equal
        let jsonitem = JSON.stringify(itemDetail);
        let jsondetails = JSON.stringify(details);
        return (
            noEmpties(rest) &&
            compEmpties.length > 0 &&
            compTotal === 100 &&
            varEmpties.length > 0 &&
            jsonitem !== jsondetails
        );
    };

    render() {
        let { inventoryData, item } = this.props;
        if (inventoryData === undefined) inventoryData = [];
        const inventoryOptions = this.buildInventoryOptions(inventoryData);
        const { details, btnLoading, errors } = this.state;
        const { composition, variants } = details;
        const btnActive = this.validateInputs(details, item);
        return (
            <F>
                <Form onSubmit={this.startSubmit}>
                    <ErrorHandler errors={errors} />
                    <Input
                        name="name"
                        label="Product Name"
                        onChange={this.handleInputChange}
                        defaultValue={details.name}
                    />
                    <Input
                        inputType="textarea"
                        name="description"
                        label="Product Description"
                        onChange={this.handleInputChange}
                        defaultValue={details.description}
                    />
                    <Segment style={{ background: "#dedede" }}>
                        <Flex wrap style={{ margin: "0 -10px" }}>
                            {this.renderComposition(composition, inventoryOptions)}
                        </Flex>
                        <Button type="button" color="blue" content="Add Product" onClick={this.addInventoryItem} />
                    </Segment>
                    {variants && (
                        <Segment style={{ background: "#dedede" }}>
                            <Flex wrap style={{ margin: "0 -10px" }}>
                                {this.renderVariants(variants)}
                            </Flex>
                            <Button type="button" color="blue" content="Add Variant" onClick={this.addVariant} />
                        </Segment>
                    )}
                    <Button primary fluid loading={btnLoading} disabled={!btnActive}>
                        Create Product
                    </Button>
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, array, func, object } = PropTypes;
CreateProduct.propTypes = {
    id: oneOfType([number, string]),
    inventoryData: array,
    getCtxData: func,
    item: object
};

export default Wrapper;
