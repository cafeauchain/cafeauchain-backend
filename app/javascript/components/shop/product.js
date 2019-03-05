import React from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Modal from "shared/modal";

import ProductForm from "shop/productForm";
/* eslint-enable */

const Products = ({ img, title, description, shortDesc, ...rest }) => (
    <Card className="flex-card">
        <Image src={img} as="div" className="card-image-container" />
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>Coffee Profile</Card.Meta>
            <Card.Description title={description}>
                {shortDesc}
                <br />
                <a href="/cart">More Info</a>
            </Card.Description>
        </Card.Content>
        <ProductForm {...rest} />
    </Card>
);

Products.propTypes = () => {
    const { array, string, node } = PropTypes;
    return {
        img: node,
        title: string,
        description: string,
        shortDesc: string,
        variantOptions: array,
        grindOptions: array
    };
};

export default Products;
