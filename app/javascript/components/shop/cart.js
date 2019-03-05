import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Item, Sticky, Header } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Modal from "shared/modal";

import ProductForm from "shop/productForm";
import CartDetails from "shop/cartDetails";

import Context from "contexts/main";
import Provider from "contexts/wholesale";
/* eslint-enable */

const Wrapper = ({ cart, ...props }) => {
    const requests = cart ? [] : ["cart"];
    return (
        <Provider requests={requests}>
            <Context>
                {ctx => (
                    <Cart
                        {...props}
                        cart={ctx.cart || cart.data}
                        loading={ctx.loading}
                        userId={ctx.userId}
                        getCtxData={ctx.getData}
                    />
                )}
            </Context>
        </Provider>
    );
};

class Cart extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            cart: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            cart: { attributes }
        } = this.props;
        let items = [];
        if (attributes) {
            items = attributes.cart_items;
        }
        return (
            <Container style={{ margin: "4em 0" }}>
                <Flex spacing="30">
                    <div flex="66">
                        <Segment>
                            <Item.Group divided relaxed="very">
                                {items.map(item => {
                                    const productOptions = [{ value: item.production_options[0], key: "product" }];
                                    const variantOptions = [
                                        { value: item.variant_id, key: "quantity", price: item.price }
                                    ];
                                    return (
                                        <Item key={item.id}>
                                            <CartDetails item={item} />
                                            <Item.Content>
                                                <ProductForm
                                                    productOptions={productOptions}
                                                    variantOptions={variantOptions}
                                                    quantity={item.quantity}
                                                    inCart
                                                    cartId={item.id}
                                                />
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

Wrapper.propTypes = {
    cart: PropTypes.object
};

export default Wrapper;
