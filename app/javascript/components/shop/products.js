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
    componentDidMount() {
        const { products, getData } = this.props;
        if (products === undefined) getData("products");
    }
    variantBuilder = (variants, name, discount) =>
        variants.map(variant => {
            const size = variant.type === "roasted" ? Weights({ content: variant.size }) : variant.size;
            const text = `${size} ($${variant.price_in_dollars})`;
            const price = Number(variant.price_in_dollars);
            const discounted_price = discount ? price * (100 - Number(discount)) / 100 : price;
            return {
                text,
                value: variant.id,
                key: variant.id,
                name,
                price,
                discounted_price
            };
        })

    productOptionsBuilder = product_options => {
        if (product_options.length === 0) {
            product_options = [];
        }
        return product_options.map(item => ({
            text: humanize(item),
            value: item,
            key: item
        }));
    };

    render() {
        const { products = [], profile: { attributes: { discount } } } = this.props;
        let sorted = sortBy({ collection: products, id: "title", namespace: "attributes" });
        sorted = sorted.filter(product => product.attributes.status === "live");
        return (
            <F>
                <Flex centermain wrap spacing="20">
                    {sorted.reduce((arr, { attributes, id }) => {
                        
                        const {
                            product_image_urls: img_urls, title, description, product_options, lots, product_type
                        } = attributes;
                        const img = img_urls.length ? img_urls[0].url : defaultImg;
                        const shortDesc = truncate(description, 200);
                        const variantOptions = this.variantBuilder(attributes.variants, title, discount);
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
                                    product_type={product_type}
                                />
                            </div>
                        ];
                    }, [])}
                </Flex>
            </F>
        );
    }
}
const { array, object, func } = PropTypes;
Products.propTypes = {
    products: array,
    profile: object,
    getData: func
};

export default withContext(Products);
