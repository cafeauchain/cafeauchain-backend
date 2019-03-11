import React from "react";
import PropTypes from "prop-types";
import { Segment, Item, Sticky, Header, Rail } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Modal from "shared/modal";
import { Money, Weights } from "shared/textFormatters";

import ProductForm from "shop/productForm";
import CartItemDetails from "shop/cartItemDetails";
import CartDetails from "shop/cartDetails";

import Context from "contexts/main";
import Provider from "contexts/wholesale";
/* eslint-enable */

const Wrapper = ({ cart, ...props }) => {
    return (
        <Context>
            {ctx => (
                <Cart {...props} cart={ctx.cart} loading={ctx.loading} userId={ctx.userId} getCtxData={ctx.getData} />
            )}
        </Context>
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
        const { cart } = this.props;
        const { cart_items: items = [], roaster_name = "" } = cart.attributes;
        return (
            <div>
                <div style={{ width: "calc( 100% - 328px )" }} ref={this.handleStickyRef}>
                    <Segment>
                        <Header as="h2" content={"Cart: " + roaster_name} dividing />
                        <Item.Group divided relaxed="very">
                            {items.map(item => {
                                const productOptions = [{ value: item.production_options[0], key: "product" }];
                                const variantOptions = [{ value: item.variant_id, key: "quantity", price: item.price }];
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
                        <Rail position="right">
                            <Sticky context={stickyRef} offset={100}>
                                <CartDetails cart={cart} />
                            </Sticky>
                        </Rail>
                    </Segment>
                </div>
            </div>
        );
    }
}

Wrapper.propTypes = {
    cart: PropTypes.object
};

export default Wrapper;
