import React from "react";
import PropTypes from "prop-types";
import { Item, Label, Image } from "semantic-ui-react";

/* eslint-disable */
import { Weights } from "shared/textFormatters";
import Flex from "shared/flex";
import Discounter from "shared/discounter";

import defaultImg from "images/cac-logo-with-bg.png";

import { humanize } from "utilities";
/* eslint-enable */

const CartItemDetails = ({ item }) => {
    const image = item.image ? item.image.url : defaultImg;
    const roasted = item.product_type === "roasted";
    return (
        <>
            <Item.Image>
                <Image size="small" style={{ borderRadius: 6, border: "2px solid #eaeaea" }} src={image} />
            </Item.Image>
            <Item.Content>
                <Item.Header>{item.name}</Item.Header>
                <Item.Extra>
                    <Flex spacing="4">
                        <div>Price Each: </div>
                        <div>
                            <Discounter original={item.price} discount={item.discounted_price} linebreak />        
                        </div>
                    </Flex>
                </Item.Extra>
                <Item.Description style={{ marginTop: 20 }}>
                    {roasted && (
                        <>
                            <Label>
                                <Weights>{item.size}</Weights>
                            </Label>
                            <Label>{humanize(item.production_options[0])}</Label>
                        </>
                    )}
                    {!roasted && (
                        <Label>{item.size}</Label>
                    )}
                </Item.Description>
            </Item.Content>
        </>
    );
};

CartItemDetails.propTypes = {
    item: PropTypes.object
};

export default CartItemDetails;
