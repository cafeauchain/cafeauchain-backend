import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Item, Label } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
import Table from "shared/table";

import { humanize, sortBy } from "utilities";

import tableDefs from "defs/tables/orderLineItems";

import withContext from "contexts/withContext";
/* eslint-enable */

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
            roaster: { attributes: roasterAtts },
            customer: { attributes: customerAtts }
        } = this.props;
        const order_items = attributes ? attributes.order_items : [];
        const roasterLogo = roasterAtts.logo_image_url;
        const customerLogo = customerAtts.logo_url;
        const sorted =
            order_items && order_items.length
                ? sortBy({ collection: order_items, id: "size", sorts: [{ name: "name" }, { name: "size" }] })
                : [];
        return (
            <div>
                <Segment>
                    <Header as="h2" content="Order Details" dividing />
                    <p>
                        <a href="/shop/orders">Back to All Orders</a>
                    </p>
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }}>
                        <Label size="large" ribbon="right" content="Open" color="green" />
                        <Flex spacing="30" spacebetween>
                            <div flex="66">
                                <Item.Group>
                                    <Item>
                                        <Item.Image size="tiny" src={roasterLogo} />
                                        <Item.Content verticalAlign="top">
                                            <Item.Header as="a">{roasterAtts.name}</Item.Header>
                                            <Item.Description>
                                                <p>
                                                    {roasterAtts.primary_address.street_1}
                                                    <br />
                                                    {roasterAtts.primary_address.street_2 && (
                                                        <F>
                                                            {roasterAtts.primary_address.street_2}
                                                            <br />
                                                        </F>
                                                    )}
                                                    {`${roasterAtts.primary_address.city}, ${roasterAtts.primary_address.state} ${roasterAtts.primary_address.postal_code}`}
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
                                            <Item.Header as="a">{customerAtts.company_name}</Item.Header>
                                            <Item.Description>
                                                <p>
                                                    {customerAtts.primary_address.street_1}
                                                    <br />
                                                    {customerAtts.primary_address.street_2 && (
                                                        <F>
                                                            {customerAtts.primary_address.street_2}
                                                            <br />
                                                        </F>
                                                    )}
                                                    {`${customerAtts.primary_address.city}, 
                                                    ${customerAtts.primary_address.state} ${customerAtts.primary_address.postal_code}`}
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
                                        <Money>{attributes.taxes}</Money>
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
            </div>
        );
    }
}

export default withContext(Order);
