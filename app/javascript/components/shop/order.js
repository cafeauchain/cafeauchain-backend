import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Label, Divider } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
import Table from "shared/table";

import { sortBy } from "utilities";

import tableDefs from "defs/tables/orderLineItems";
import Addresses from "wholesale/orders/partials/addresses";
import Details from "wholesale/orders/partials/details";
import PaymentDetails from "shop/orders/partials/payment_details";

import withContext from "contexts/withContext";
/* eslint-enable */

class Order extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            order: object
        };
    };

    state = {}
    render() {
        const {
            order: { attributes = {}, id },
            roaster: { attributes: roasterAtts },
            customer: { attributes: customerAtts },
            cards,
            stripeApiKey,
            updateContext
        } = this.props;
        const order_items = attributes ? attributes.order_items : [];
        const sorted =
            order_items && order_items.length
                ? sortBy({ collection: order_items, id: "size", sorts: [{ name: "name" }, { name: "size" }] })
                : [];
        const invoice_status = attributes.invoice.status;

        let payment_label = {
            text: invoice_status === "paid_in_full" ? "Paid" : "Open",
            color: invoice_status === "paid_in_full" ? "black" : "green"
        };

        return (
            <div>
                <Segment>
                    <Header as="h2" content="Order Details" dividing />
                    <a href="/shop/orders">Back to All Orders</a>
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }}>
                        <Label size="large" ribbon="right" content={payment_label.text} color={payment_label.color} />
                        <Flex spacing="30" spacebetween>
                            <div flex="66">
                                <Addresses roaster={roasterAtts} customer={customerAtts} />
                            </div>
                            <div flex="33" style={{ textAlign: "right" }}>
                                <Details attributes={attributes} id={id} isCustomer />
                                <Divider />
                                <PaymentDetails 
                                    attributes={attributes}
                                    cards={cards}
                                    stripeApiKey={stripeApiKey}
                                    updateContext={updateContext}
                                />
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
                        {false && (
                            <React.Fragment>
                                <br />
                                <p>
                                    <strong>Notes:</strong>
                                </p>
                                <Segment secondary>These are notes. Should they be editable?</Segment>
                                <p>
                                    <strong>Terms:</strong>
                                </p>
                                <Segment secondary>These are full terms. Should they be editable?</Segment>
                            </React.Fragment>
                        )}
                    </Segment>
                </Segment>
            </div>
        );
    }
}

export default withContext(Order);
