import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button, Card, Image, Icon } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Table from "shared/table";
import Flex from "shared/flex";
import Input from "shared/input";
import Modal from "shared/modal";
import { Weights, Money } from "shared/textFormatters";

import Product from "shop/product";

import defaultImg from "images/coffee-imgs/coffee-img-14.jpg";

import tableDefs from "defs/tables/roastedInventory";

import { sortBy, truncate, callMeDanger } from "utilities";

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
            const text = Weights({ content: attributes.bag_size });
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
        const { loading, userId, products = [], variants = [] } = this.props;
        let sorted = sortBy({ collection: products, id: "title", namespace: "attributes" });
        return (
            <F>
                <Header as="h2" content="Product Grid" />
                <Flex centermain wrap spacing="10">
                    {sorted.map(({ attributes, id }) => {
                        const { product_image_urls, title, description } = attributes;
                        const img = product_image_urls[0] || defaultImg;
                        const shortDesc = truncate(description, 200);
                        const variantOptions = this.variantBuilder(variants, id, title);
                        const grindOptions = [
                            { value: "whole_bean", text: "Whole Bean", key: "whole_bean" },
                            { value: "medium_grind", text: "Medium Grind", key: "medium_grind" }
                        ];

                        // return (
                        //     <Product
                        //         id={id}
                        //         img={img}
                        //         title={title}
                        //         description={description}
                        //         shortDesc={shortDesc}
                        //         variantOptions={variantOptions}
                        //         grindOptions={grindOptions}
                        //     />
                        // );

                        return (
                            <div key={id} flex="33" style={{ flexGrow: 0, margin: 0 }}>
                                <Card className="flex-card">
                                    <Image src={img} as="div" className="card-image-container" />
                                    <Card.Content>
                                        <Card.Header>{title}</Card.Header>
                                        <Card.Meta>
                                            <span className="date">Coffee Profile</span>
                                        </Card.Meta>
                                        <Card.Description title={description}>
                                            {shortDesc}
                                            <br />
                                            <a href="/cart">More Info</a>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Header as="h4" content="Pricing:" />
                                        {variantOptions.length > 0 && (
                                            <div style={{ marginBottom: 10 }}>
                                                {variantOptions.map(variant => (
                                                    <Flex spacebetween key={variant.key} className="flex-striped">
                                                        <span>
                                                            <Weights>{variant.value}</Weights>
                                                        </span>
                                                        <Money>{variant.price}</Money>
                                                    </Flex>
                                                ))}
                                            </div>
                                        )}

                                        <Flex spacing="10">
                                            <div flex="50">
                                                {variantOptions.length > 1 && (
                                                    <Input inputType="select" options={variantOptions} label="Size" />
                                                )}
                                                {variantOptions.length === 1 && (
                                                    <Input
                                                        label="Size"
                                                        value={Weights({ content: variantOptions[0].value })}
                                                        readOnly
                                                    />
                                                )}
                                            </div>
                                            <div flex="50">
                                                <Input
                                                    label="Grind"
                                                    inputType="select"
                                                    options={grindOptions}
                                                    defaultValue={grindOptions[0].value}
                                                />
                                            </div>
                                        </Flex>
                                        <Card.Description>
                                            <Input
                                                placeholder="Update..."
                                                action
                                                label="Quantity"
                                                name="quantity"
                                                type="number"
                                                onChange={this.handleInputChange}
                                                defaultValue={2}
                                            >
                                                <Button
                                                    type="button"
                                                    style={{ background: "#eaeaea" }}
                                                    icon
                                                    content={<Icon name="minus" />}
                                                    compact
                                                    onClick={this.resetState}
                                                />
                                                <input />
                                                <Button
                                                    type="button"
                                                    primary
                                                    icon
                                                    content={<Icon name="plus" />}
                                                    compact
                                                    onClick={this.submit}
                                                />
                                            </Input>
                                        </Card.Description>
                                        <br />
                                        <Card.Header>
                                            <Flex spacebetween>
                                                <span>Subtotal: </span>
                                                <Money type="positive">35.98</Money>
                                            </Flex>
                                            <br />
                                            <Button primary floated="right">
                                                <Icon name="cart plus" />
                                                Add To Cart
                                            </Button>
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                            </div>
                        );
                    })}
                </Flex>
            </F>
        );
    }
}

const { array, bool, oneOfType, string, number, func } = PropTypes;
Products.propTypes = {
    products: array,
    variants: array,
    loading: bool,
    userId: oneOfType([string, number]),
    getCtxData: func
};

export default Wrapper;
