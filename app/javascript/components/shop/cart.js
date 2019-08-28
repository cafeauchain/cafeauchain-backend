import React from "react";
import PropTypes from "prop-types";
import { Segment, Item, Header } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";

import EmptyCart from "shop/cart/emptyCart";
import ProductForm from "shop/productForm";
import CartItemDetails from "shop/cartItemDetails";
import CartDetails from "shop/cartDetails";

import withContext from "contexts/withContext";
/* eslint-enable */

class Cart extends React.PureComponent {

    render() {
        const { cart } = this.props;
        const { cart_items: items = [], roaster_name = "" } = cart.attributes;
        if( !items.length ){
            return (
                <EmptyCart roaster_name={roaster_name} />
            );
        }
        return (
            <Flex spacing="20" wrap>
                <div flex="fill">
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
                    </Segment>
                </div>
                <div className="cart-sidebar" flex="25">
                    <CartDetails cart={cart} />
                </div>  
            </Flex>
        );
    }
}

Cart.propTypes = {
    cart: PropTypes.object
};

export default withContext(Cart);
