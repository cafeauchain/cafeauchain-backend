import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Label, Divider } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Flex from "shared/flex";
import Table from "shared/table";

import { sortBy, slugify } from "utilities";

import tableDefs from "defs/tables/orderLineItems";
import Addresses from "wholesale/orders/partials/addresses";
import Details from "wholesale/orders/partials/details";
import PaymentDetails from "shop/orders/partials/payment_details";
import Totals from "wholesale/orders/partials/totals";
import Pdfer from "shop/orders/partials/pdfer";

import withContext from "contexts/withContext";
/* eslint-enable */

class Order extends React.PureComponent {
    render() {
        const {
            order: { attributes = {}, id },
            roaster: { attributes: roasterAtts },
            customer: { attributes: customerAtts }
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

        const order_date = moment(attributes.order_date).format("YYYY-MM-DD");
        const roaster_name = slugify(roasterAtts.name);
        const company_name = slugify(customerAtts.company_name)
        const filename = order_date + "_" + "order_" + id + "_" + roaster_name + "_" + company_name;

        return (
            <div>
                <Segment>
                    <Header as="h2" content="Order Details" dividing />
                    <Flex spacebetween spacing="20">
                        <div flex="auto">
                            <a href="/shop/orders">Back to All Orders</a>
                        </div>
                        <div flex="auto">
                            <Pdfer filename={filename} title="Download Invoice" />
                        </div>
                    </Flex>
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }}>
                        <div id="pdf_container">
                            <Label 
                                size="large" 
                                ribbon="right" 
                                content={payment_label.text} 
                                color={payment_label.color}
                            />
                            <Flex spacing="30" spacebetween>
                                <div flex="66">
                                    <Addresses roaster={roasterAtts} customer={customerAtts} />
                                </div>
                                <div flex="33" style={{ textAlign: "right" }}>
                                    <Details attributes={attributes} id={id} isCustomer />
                                    <Divider />
                                    <PaymentDetails attributes={attributes} />
                                </div>
                            </Flex>
                            <br />
                            <Table tableDefs={tableDefs} data={sorted} />
                            <br />
                            <Flex spacing="30" spacebetween>
                                <div flex="66">
                                    {attributes.notes && (
                                        <React.Fragment>
                                            <p>
                                                <strong>Order Notes:</strong>
                                            </p>
                                            <Segment secondary>{attributes.notes}</Segment>
                                        </React.Fragment>
                                    )}
                                </div>
                                <div flex="33" style={{ textAlign: "right", marginTop: "auto" }}>
                                    <Totals attributes={attributes} isCustomer />
                                </div>
                            </Flex>
                        </div>
                    </Segment>
                </Segment>
            </div>
        );
    }
}

const { object } = PropTypes;
Order.propTypes = {
    order: object,
    roaster: object,
    customer: object
};

export default withContext(Order);
