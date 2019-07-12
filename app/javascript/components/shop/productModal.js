import React from "react";
import PropTypes from "prop-types";
import { Divider, Segment, Header } from "semantic-ui-react";
import * as Showdown from "showdown";

import "./styles.scss";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

/* eslint-disable */
import Titler from "shared/titler";
import Flex from "shared/flex";

import ProductForm from "shop/productForm";

import { callMeDanger } from "utilities";
/* eslint-enable */

const LongText = ({ content }) => {
    const converter = new Showdown.Converter();
    return callMeDanger(converter.makeHtml(content), "div");
};

const ProductModal = ({ img, title, description, shortDesc, lots, imgs, ...rest }) => (
    <React.Fragment>
        <Flex spacebetween spacing="20">
            <div flex="66" style={{maxWidth: "66%"}}>
                <Carousel showStatus={false} dynamicHeight infiniteLoop showThumbs={false}>
                    {imgs.map(image => {
                        return (
                            <div key={image.id}>
                                <img src={image.url} alt="" key={image.id} />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
            <div flex="33">
                {lots.map(lot => {
                    return (
                        <Segment secondary key={lot.id}>
                            <Header as="h4" content="Lot Details" />
                            <Titler title="Lot" value={lot.name} linebreak />
                            <Titler title="Origin" value={lot.origin} linebreak />
                            <Titler title="Harvest" value={lot.harvest_year} />
                        </Segment>
                    );
                })}
            </div>
        </Flex>
        <Divider />
        <LongText content={description} />
        <Divider />
        <ProductForm {...rest} />
    </React.Fragment>
);

ProductModal.propTypes = () => {
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

export default ProductModal;
