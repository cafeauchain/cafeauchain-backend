import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Item, Sticky, Header, Card } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Modal from "shared/modal";
import { Money, Weights } from "shared/textFormatters";

import ProductForm from "shop/productForm";
import CartItemDetails from "shop/cartItemDetails";

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

    handleStickyRef = stickyRef => this.setState({ stickyRef });

    render() {
        const { stickyRef } = this.state;
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
                    <div flex="66" ref={this.handleStickyRef}>
                        <Segment>
                            <Item.Group divided relaxed="very">
                                {items.map(item => {
                                    const productOptions = [{ value: item.production_options[0], key: "product" }];
                                    const variantOptions = [
                                        { value: item.variant_id, key: "quantity", price: item.price }
                                    ];
                                    return (
                                        <Item key={item.id}>
                                            <CartItemDetails item={item} />
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
                    <div flex="33">
                        <Sticky context={stickyRef} offset={100}>
                            <Segment>
                                <Header as="h2" content="Cart Totals" />
                                <div>
                                    <F>Total Line Items: </F>
                                    {attributes.total_line_items}
                                </div>
                                <div>
                                    <F>Total Items: </F>
                                    {attributes.total_items}
                                </div>
                                <div>
                                    <F>Total Weight: </F>
                                    <Weights>{attributes.total_weight}</Weights>
                                </div>
                                <div>
                                    <F>Cart Total: </F>
                                    <Money type="postive">{attributes.total_price}</Money>
                                </div>
                            </Segment>
                        </Sticky>
                    </div>
                </Flex>
            </Container>
        );
    }
}

Wrapper.propTypes = {
    cart: PropTypes.object
};

export default Wrapper;
