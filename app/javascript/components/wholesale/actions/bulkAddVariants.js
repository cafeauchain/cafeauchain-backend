import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Table from "shared/table";

import tableDefs from "defs/forms/addVariants";

// import Variants from "wholesale/partials/variants";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const variantsDefault = () => ({ size: "", price_in_dollars: "", id: shortid.generate(), isNew: true });

const Wrapper = props => (
    <Context>
        {ctx => (
            <CreateProduct
                {...props}
                userId={ctx.userId}
                products={ctx.products}
                variants={ctx.variants}
                getCtxData={ctx.getData}
                updateContext={ctx.updateContext}
            />
        )}
    </Context>
);

class CreateProduct extends Component {
    state = {
        btnLoading: false,
        errors: [],
        details: {
            variants: []
        },
        product_id: ""
    };
    componentDidMount() {
        const { products, variants, getCtxData } = this.props;
        if (products === undefined) getCtxData("products");
        if (variants === undefined) getCtxData("variants");
    }

    handleInputChange = (event, { value, name, checked, object, index, ...rest }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (object && rest.item !== undefined) {
            let temp = details[object].find(({ id }) => id === rest.item.id);
            temp[name] = val;
        } else {
            details[name] = val;
        }
        this.setState({ details, errors: [] });
    };

    handleProductChange = (event, { value }) => {
        const { variants } = this.props;
        const filtered = this.buildFilteredVariants(variants, value);
        this.setState({ details: { variants: filtered }, product_id: value });
    };

    buildFilteredVariants = (variants, value) =>
        variants.reduce((arr, { attributes, id }) => {
            if (attributes.product_id === value) {
                return [
                    ...arr,
                    {
                        id: id,
                        size: attributes.bag_size,
                        price_in_dollars: attributes.price_in_dollars,
                        isNew: false
                    }
                ];
            }
            return arr;
        }, []);

    buildProductOptions = products =>
        products.map(({ id, attributes: { title } }) => ({
            value: id,
            text: title,
            key: id,
            id,
            name: title
        }));

    addVariant = () => {
        let { details } = this.state;
        const variant = variantsDefault();
        details.variants = [...details.variants, variant];
        this.setState({ details });
    };

    render() {
        const { products = [], variants = [] } = this.props;
        const { btnLoading, errors, details, product_id } = this.state;
        const productOptions = this.buildProductOptions(products);
        if (!products.length || !variants.length) {
            return null;
        }

        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Input
                    inputType="select"
                    options={productOptions}
                    name="product_id"
                    label="Select a Product"
                    onChange={this.handleProductChange}
                />
                {product_id && (
                    <F>
                        <Table
                            tableDefs={tableDefs}
                            data={details.variants}
                            inputExtras={{ onChange: this.handleInputChange }}
                        />
                        <br />
                        <Button type="button" color="blue" content="Add Variant" onClick={this.addVariant} />
                        <br />
                        <br />
                    </F>
                )}
                <Button
                    primary
                    fluid
                    loading={btnLoading}
                    // disabled={!btnActive}
                    onClick={this.handleSubmit}
                    content="Add Sizes"
                />
            </Form>
        );
    }
}

const { array, func } = PropTypes;
CreateProduct.propTypes = {
    products: array,
    variants: array,
    getCtxData: func
};

export default Wrapper;
