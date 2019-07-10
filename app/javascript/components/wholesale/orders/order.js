import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Item, Label } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
import Table from "shared/table";

import { humanize, sortBy } from "utilities";

import OrderFulfillment from "wholesale/orders/orderFulfillment";
import OrderAddresses from "wholesale/orders/partials/addresses";

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
            profile: { attributes: roasterAtts },
            customer: { attributes: customerAtts }
        } = this.props;
        const order_items = attributes ? attributes.order_items : [];
        const sorted =
            order_items && order_items.length
                ? sortBy({ collection: order_items, id: "size", sorts: [{ name: "name" }, { name: "size" }] })
                : [];
        const closed = attributes.status === "fulfilled";

        return (
            <div>
                <Segment>
                    <Header as="h2" content="Order Details" dividing />
                    <p>
                        <a href="/manage/orders">Back to All Orders</a>
                    </p>
                    <OrderFulfillment id={id} status={attributes.status} />
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }}>
                        <Label
                            size="large"
                            ribbon="right"
                            content={closed ? "Closed" : "Open"}
                            color={closed ? "black" : "green"}
                        />
                        <Flex spacing="30" spacebetween>
                            <div flex="66">
                                <OrderAddresses roaster={roasterAtts} customer={customerAtts} />
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
                                    <div flex="50">{attributes.terms}</div>
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
                    </Segment>
                </Segment>
            </div>
        );
    }
}

export default withContext(Order);
