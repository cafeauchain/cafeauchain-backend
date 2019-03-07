import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header, Item, Label } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, Weights } from "shared/textFormatters";
import Table from "shared/table";
import randomCoffeeImage from "shared/randomCoffeeImage";

import { humanize, sortBy } from "utilities";

import tableDefs from "defs/tables/orderLineItems";

import Context from "contexts/main";
import Provider from "contexts/wholesale";
/* eslint-enable */

const Wrapper = ({ order, ...props }) => {
    const requests = order ? [] : [];
    return (
        <Provider requests={requests}>
            <Context>
                {ctx => (
                    <Order
                        {...props}
                        order={order.data}
                        loading={ctx.loading}
                        userId={ctx.userId}
                        getCtxData={ctx.getData}
                    />
                )}
            </Context>
        </Provider>
    );
};

Wrapper.propTypes = {
    order: PropTypes.object
};

class Order extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            order: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            order: { attributes = {}, id },
            roaster = {},
            user = {}
        } = this.props;
        const order_items = attributes ? attributes.order_items : [];
        const roasterLogo = roaster.roaster_img_url || randomCoffeeImage();
        const customerLogo = user.img_url || randomCoffeeImage();
        const sorted =
            order_items && order_items.length
                ? sortBy({ collection: order_items, id: "size", sorts: [{ name: "name" }, { name: "size" }] })
                : [];
        return (
            <Container style={{ margin: "4em 0" }}>
                <Segment>
                    <Header as="h2" content="Order Details" dividing />
                    <p>
                        <a href="/manage/orders">Back to All Orders</a>
                    </p>
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }}>
                        <Label size="large" ribbon="right" content="Open" color="green" />
                        <Flex spacing="30" spacebetween>
                            <div flex="66">
                                <Item.Group>
                                    <Item>
                                        <Item.Image size="tiny" src={roasterLogo} />
                                        <Item.Content verticalAlign="top">
                                            <Item.Header as="a">{roaster.name}</Item.Header>
                                            <Item.Description>
                                                <p>
                                                    {roaster.address_1}
                                                    <br />
                                                    {roaster.address_2 && (
                                                        <F>
                                                            {roaster.address_2}
                                                            <br />
                                                        </F>
                                                    )}
                                                    {`${roaster.city}, ${roaster.state} ${roaster.zip_code}`}
                                                </p>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                    <Item>
                                        <Item.Content>
                                            <Item.Meta content="Bill To:" />
                                        </Item.Content>
                                    </Item>
                                    <Item>
                                        <Item.Image size="tiny" src={customerLogo} />
                                        <Item.Content verticalAlign="top">
                                            <Item.Header as="a">The Coffee Drinkery</Item.Header>
                                            <Item.Description>
                                                <p>
                                                    123 Any Street
                                                    <br />
                                                    Somewhere, AL 30606
                                                </p>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </div>
                            <div flex="33" style={{ textAlign: "right" }}>
                                <Header as="h2">{"Invoice #" + id}</Header>
                                <Flex spacing="10" spacebetween wrap>
                                    <div flex="50">
                                        <strong>Date: </strong>
                                    </div>
                                    <div flex="50">{moment(attributes.order_date).format("MMM D, YYYY")}</div>
                                    <div flex="50">
                                        <strong>Terms:</strong>
                                    </div>
                                    <div flex="50">On Receipt</div>
                                    <div flex="50">
                                        <strong>Status:</strong>
                                    </div>
                                    <div flex="50">{humanize(attributes.status)}</div>
                                    <div flex="50">
                                        <strong>Balance Due:</strong>
                                    </div>
                                    <div flex="50">
                                        <Money type="positive">{attributes.order_total}</Money>
                                    </div>
                                </Flex>
                            </div>
                        </Flex>
                        <br />
                        <Table tableDefs={tableDefs} data={sorted} />
                        <br />
                        <Flex spacing="30" spacebetween>
                            <div flex="66" />
                            <div flex="33" style={{ textAlign: "right" }}>
                                <Flex spacing="10" spacebetween wrap>
                                    <div flex="50">
                                        <strong>Subtotal: </strong>
                                    </div>
                                    <div flex="50">
                                        <Money>{attributes.subtotal}</Money>
                                    </div>
                                    <div flex="50">
                                        <strong>Tax:</strong>
                                    </div>
                                    <div flex="50">
                                        <Money>0</Money>
                                    </div>
                                    <div flex="50">
                                        <strong>Shipping:</strong>
                                    </div>
                                    <div flex="50">
                                        <Money>{attributes.shipping}</Money>
                                    </div>
                                    <div flex="50">
                                        <strong>Total:</strong>
                                    </div>
                                    <div flex="50">
                                        <Money type="positive">{attributes.order_total}</Money>
                                    </div>
                                </Flex>
                            </div>
                        </Flex>
                        <br />
                        <p>
                            <strong>Notes:</strong>
                        </p>
                        <Segment secondary>These are notes. Should they be editable?</Segment>
                        <p>
                            <strong>Terms:</strong>
                        </p>
                        <Segment secondary>These are full terms. Should they be editable?</Segment>
                    </Segment>
                </Segment>
            </Container>
        );
    }
}

export default Wrapper;
