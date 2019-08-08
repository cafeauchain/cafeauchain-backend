import React, { Fragment as F } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import { Weights } from "shared/textFormatters";
import defaultImg from "images/cac-logo-with-bg.png";

import Product from "shop/product";

import { sortBy, truncate, humanize } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

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
        const { products, variants, getData } = this.props;
        if (products === undefined) getData("products");
        if (variants === undefined) getData("variants");
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
                        const { product_image_urls: img_urls, title, description, product_options, lots } = attributes;
                        const img = img_urls.length ? img_urls[0].url : defaultImg;
                        const shortDesc = truncate(description, 200);
                        const variantOptions = this.variantBuilder(variants, id, title);
                        const productOptions = this.productOptionsBuilder(product_options);
                        if (!variantOptions.length) return arr;

                        return [
                            ...arr,
                            <div key={id} flex="33" className="product-card">
                                <Product
                                    img={img}
                                    imgs={img_urls}
                                    title={title}
                                    description={description}
                                    shortDesc={shortDesc}
                                    variantOptions={variantOptions}
                                    productOptions={productOptions}
                                    lots={lots}
                                />
                            </div>
                        ];
                    }, [])}
                </Flex>
            </F>
        );
    }
}

export default withContext(Products);
