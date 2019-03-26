import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Item, Label, Image } from "semantic-ui-react";

/* eslint-disable */
import { Weights, Money } from "shared/textFormatters";
import defaultImg from "images/cac-logo-with-bg.png";

import { humanize } from "utilities";
/* eslint-enable */

const CartItemDetails = ({ item }) => {
    const image = item.image ? item.image.url : defaultImg;
    return (
        <F>
            <Item.Image>
                <Image size="small" style={{ borderRadius: 6, border: "2px solid #eaeaea" }} src={image} />
            </Item.Image>
            <Item.Content>
                <Item.Header>{item.name}</Item.Header>
                <Item.Extra>
                    <F>Price Each: </F>
                    <Money type="positive">{item.price}</Money>
                </Item.Extra>
                <Item.Description style={{ marginTop: 20 }}>
                    <Label>
                        <Weights>{item.size}</Weights>
                    </Label>
                    <Label>{humanize(item.production_options[0])}</Label>
                </Item.Description>
            </Item.Content>
        </F>
    );
};

CartItemDetails.propTypes = {
    item: PropTypes.object
};

export default CartItemDetails;
