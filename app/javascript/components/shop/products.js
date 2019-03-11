import React, { Fragment as F } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import { Weights, Money } from "shared/textFormatters";
import defaultImg from "images/cac-logo-with-bg.png";

import Product from "shop/product";

import { sortBy, truncate, humanize } from "utilities";

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
    static propTypes = () => {
        const { array, func } = PropTypes;
        return {
            products: array,
            variants: array,
            getCtxData: func
        };
    };

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
                        value: variant_id,
                        key: variant_id,
                        id: variant_id,
                        name,
                        price: attributes.price_in_dollars
                    }
                ];
            }
            return arr;
        }, []);

    productOptionsBuilder = product_options => {
        if (product_options.length === 0) {
            product_options = ["whole_bean"];
        }
        return product_options.map(item => ({
            text: humanize(item),
            value: item,
            key: item
        }));
    };

    render() {
        const { products = [], variants = [] } = this.props;
        let sorted = sortBy({ collection: products, id: "title", namespace: "attributes" });
        sorted = sorted.filter(product => product.attributes.status === "live");
        return (
            <F>
                <Flex centermain wrap spacing="20">
                    {sorted.reduce((arr, { attributes, id }) => {
                        const { product_image_urls, title, description, product_options } = attributes;
                        const img = product_image_urls[0] || defaultImg;
                        const shortDesc = truncate(description, 200);
                        const variantOptions = this.variantBuilder(variants, id, title);
                        const productOptions = this.productOptionsBuilder(product_options);
                        if (!variantOptions.length) return arr;

                        return [
                            ...arr,
                            <div key={id} flex="33" style={{ flexGrow: 0, margin: "15px 0" }}>
                                <Product
                                    img={img}
                                    title={title}
                                    description={description}
                                    shortDesc={shortDesc}
                                    variantOptions={variantOptions}
                                    productOptions={productOptions}
                                />
                            </div>
                        ];
                    }, [])}
                </Flex>
            </F>
        );
    }
}

export default Wrapper;
