import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

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
        this.state = {
            details: defaultDetails,
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
        const { id, getCtxData } = this.props;
        const url = `${ROASTER_URL(id)}/products`;
        let body = { ...details };
        let respJSON = await requester({ url, body });
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
        return composition.map((item, idx) => {
            return (
                // eslint-disable-next-line
                <F key={idx}>
                    <Header as="h4" content={"Inventory Item " + (idx + 1)} />
                    <Input
                        inputType="select"
                        options={inventoryOptions}
                        onChange={this.handleInputChange}
                        name="inventory_item_id"
                        object="composition"
                        index={idx}
                        label="Choose Inventory Item"
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
                    />
                </F>
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
                <F key={idx}>
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
                </F>
            );
        });
    };

    addVariant = () => {
        let { details } = this.state;
        const variant = { size: null, price_in_cents: null };
        details.variants = [...details.variants, variant];
        this.setState({ details });
    };

    validateInputs = ({ composition, variants, ...rest }) => {
        const compEmpties = composition.filter(item => noEmpties(item));
        const compTotal = composition.reduce((total, item) => {
            return total + Number(item.pct);
        }, 0);

        const varEmpties = variants.filter(item => noEmpties(item));

        return noEmpties(rest) && compEmpties.length && compTotal === 100 && varEmpties.length;
    };

    render() {
        let { inventoryData } = this.props;
        if (inventoryData === undefined) inventoryData = [];
        const inventoryOptions = this.buildInventoryOptions(inventoryData);
        const { details, btnLoading, errors } = this.state;
        const { composition, variants } = details;
        const btnActive = this.validateInputs(details);
        return (
            <F>
                <Header as="h2" content="Create Product" />
                <Form onSubmit={this.startSubmit}>
                    <ErrorHandler errors={errors} />
                    <Input name="name" label="Product Name" onChange={this.handleInputChange} />
                    <Input
                        inputType="textarea"
                        name="description"
                        label="Product Description"
                        onChange={this.handleInputChange}
                    />
                    <Segment style={{ background: "#dedede" }}>
                        {this.renderComposition(composition, inventoryOptions)}
                        <Button type="button" color="blue" content="Add Product" onClick={this.addInventoryItem} />
                    </Segment>
                    <Segment style={{ background: "#dedede" }}>
                        {this.renderVariants(variants)}
                        <Button type="button" color="blue" content="Add Variant" onClick={this.addVariant} />
                    </Segment>
                    <Button primary fluid loading={btnLoading} disabled={!btnActive}>
                        Create Product
                    </Button>
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, array, func } = PropTypes;
CreateProduct.propTypes = {
    id: oneOfType([number, string]),
    inventoryData: array,
    getCtxData: func
};

export default Wrapper;
