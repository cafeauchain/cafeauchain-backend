import React from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Modal from "shared/modal";
import Titler from "shared/titler";

import ProductForm from "shop/productForm";

import ProductModal from "shop/productModal";
/* eslint-enable */

const Product = ({ img, title, description, shortDesc, lots, ...rest }) => (
    <Card className="flex-card">
        <Image src={img} as="div" className="card-image-container" />
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            {lots.map(lot => {
                return (
                    <Card.Meta key={lot.id}>
                        <Titler title="Lot" value={lot.name} linebreak />
                        <Titler title="Origin" value={lot.origin} linebreak />
                        <Titler title="Harvest" value={lot.harvest_year} />
                    </Card.Meta>
                );
            })}
            <Card.Description title={description}>
                {shortDesc}
                <br />
                <Modal
                    text="More Info"
                    title={title + " Details"}
                    component={<ProductModal {...rest} description={description} img={img} title={title} lots={lots} />}
                    unstyled
                    className="link"
                />
            </Card.Description>
        </Card.Content>
        <ProductForm {...rest} />
    </Card>
);

Product.propTypes = () => {
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

export default Product;
