import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import { Weights, Money } from "shared/textFormatters";
import randomCoffeeImage from "shared/randomCoffeeImage";

import Product from "shop/product";

import { sortBy, truncate } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <Products
                {...props}
                products={ctx.products}
                variants={ctx.variants}
                loading={ctx.loading}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class Products extends React.Component {
    componentDidMount() {
        const { products, variants, getCtxData } = this.props;
        if (products === undefined) getCtxData("inventory");
        if (variants === undefined) getCtxData("variants");
    }
    variantBuilder = (variants, id, name) =>
        variants.reduce((arr, { id: variant_id, attributes }) => {
            const text = Weights({ content: attributes.bag_size }) + "  ($" + attributes.price_in_dollars + ")";
            if (attributes.product_id === id) {
                return [
                    ...arr,
                    {
                        text,
                        value: attributes.bag_size,
                        key: variant_id,
                        id: variant_id,
                        name,
                        price: attributes.price_in_dollars
                    }
                ];
            }
            return arr;
        }, []);
    render() {
        const { products = [], variants = [] } = this.props;
        let sorted = sortBy({ collection: products, id: "title", namespace: "attributes" });
        return (
            <F>
                <Header as="h2" content="Product Grid" />
                <Flex centermain wrap spacing="20">
                    {sorted.reduce((arr, { attributes, id }) => {
                        const { product_image_urls, title, description } = attributes;
                        const img = product_image_urls[0] || randomCoffeeImage();
                        const shortDesc = truncate(description, 200);
                        const variantOptions = this.variantBuilder(variants, id, title);
                        const grindOptions = [
                            { value: "whole_bean", text: "Whole Bean", key: "whole_bean" },
                            { value: "medium_grind", text: "Medium Grind", key: "medium_grind" }
                        ];
                        if (!variantOptions.length) return arr;

                        return [
                            ...arr,
                            <div key={id} flex="33" style={{ flexGrow: 0, margin: "15px 0" }}>
                                <Product
                                    id={id}
                                    img={img}
                                    title={title}
                                    description={description}
                                    shortDesc={shortDesc}
                                    variantOptions={variantOptions}
                                    grindOptions={grindOptions}
                                />
                            </div>
                        ];
                    }, [])}
                </Flex>
            </F>
        );
    }
}

const { array, func } = PropTypes;
Products.propTypes = {
    products: array,
    variants: array,
    getCtxData: func
};

export default Wrapper;
