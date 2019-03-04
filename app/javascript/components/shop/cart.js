import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Button, Item, Label, Icon } from "semantic-ui-react";

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
                <Segment>
                    <Item.Group divided relaxed="very">
                        {items.map(item => {
                            const image = item.image || randomCoffeeImage();
                            return (
                                <Item key={item.id}>
                                    <Item.Image size="tiny" src={image} />
                                    <Item.Content>
                                        <Item.Header>{item.name}</Item.Header>
                                        <Item.Meta>
                                            <div>
                                                <F>Size: </F>
                                                <Weights>{item.size}</Weights>
                                            </div>
                                            <div>
                                                <F>Price Each: </F>
                                                <Money type="positive">{item.price}</Money>
                                            </div>
                                        </Item.Meta>
                                        <Item.Description>
                                            <ProductForm
                                                productOptions={[{ text: "temp", value: item.size, key: "temp" }]}
                                                variantOptions={[
                                                    {
                                                        text: "temp2",
                                                        value: item.quantity,
                                                        key: "temp2",
                                                        price: item.price
                                                    }
                                                ]}
                                                inCart
                                            />
                                        </Item.Description>
                                        <Item.Extra>A link to something?</Item.Extra>
                                        <Item.Extra>
                                            <Label>IMAX</Label>
                                            <Label icon="globe" content="Additional Languages" />
                                        </Item.Extra>
                                        <Item.Extra>
                                            <Button primary floated="right">
                                                Buy tickets
                                                <Icon name="right chevron" />
                                            </Button>
                                            <Label>Limited</Label>
                                        </Item.Extra>
                                        <Item.Meta>A link to something?</Item.Meta>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                </Segment>
            </Container>
        );
    }
}

export default Wrapper;
