import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Item } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Input from "shared/input";
import Modal from "shared/modal";
import { Weights, Money } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";
import randomCoffeeImage from "shared/randomCoffeeImage";

import ProductForm from "shop/productForm";

import { requester, url as API_URL } from "utilities/apiUtils";

import Context from "contexts/main";
import Provider from "contexts/wholesale";
/* eslint-enable */

const Wrapper = props => (
    <Provider requests={[{ name: "cart" }]}>
        <Context>
            {ctx => <Cart {...props} loading={ctx.loading} userId={ctx.userId} getCtxData={ctx.getData} />}
        </Context>
    </Provider>
);

class Cart extends React.Component {
    static propTypes = () => {
        const { array } = PropTypes;
        return {
            variantOptions: array,
            productOptions: array
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            cart: { data: cart }
        } = this.props;
        let items = [];
        if (cart.attributes) {
            items = cart.attributes.cart_items;
        }
        return (
            <Container style={{ margin: "4em 0" }}>
                <Flex spacing="30">
                    <div flex="66">
                        <Segment>
                            <Item.Group divided relaxed="very">
                                {items.map(item => {
                                    const image = item.image || randomCoffeeImage();
                                    const productOptions = [{ value: item.size, key: "product" }];
                                    const variantOptions = [
                                        { value: item.variant_id, key: "quantity", price: item.price }
                                    ];
                                    return (
                                        <Item key={item.id}>
                                            <Item.Image size="tiny" src={image} />
                                            <Item.Content>
                                                <Item.Header>{item.name}</Item.Header>
                                                <Item.Extra>
                                                    <F>Size: </F>
                                                    <Weights>{item.size}</Weights>
                                                </Item.Extra>
                                                <Item.Extra>
                                                    <F>Price Each: </F>
                                                    <Money type="positive">{item.price}</Money>
                                                </Item.Extra>
                                                <Item.Description>
                                                    <ProductForm
                                                        productOptions={productOptions}
                                                        variantOptions={variantOptions}
                                                        quantity={item.quantity}
                                                        inCart
                                                    />
                                                </Item.Description>
                                            </Item.Content>
                                        </Item>
                                    );
                                })}
                            </Item.Group>
                        </Segment>
                    </div>
                    <div flex="33">Cart Total</div>
                </Flex>
            </Container>
        );
    }
}

export default Wrapper;
