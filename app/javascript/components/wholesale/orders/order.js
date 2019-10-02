import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Label, Button, Icon, Dimmer } from "semantic-ui-react";

/* eslint-disable */
import styles from "./inline-print-styles"

import Flex from "shared/flex";
import Table from "shared/table";
import Modal from "shared/modal";
import Titler from "shared/titler";

import { sortBy } from "utilities";

import OrderFulfillment from "wholesale/orders/orderFulfillment";
import OrderAddresses from "wholesale/orders/partials/addresses";
import OrderDetails from "wholesale/orders/partials/details";
import OrderTotals from "wholesale/orders/partials/totals";
import LineItem from "wholesale/orders/partials/editLineItem";
import EditShipping from "wholesale/orders/partials/editShipping";
import ManualShipping from "wholesale/orders/partials/manualShipping";
import Fulfillment from "wholesale/orders/partials/fulfillment";
import Packer from "manage/production/packer";
import DeleteOrder from "wholesale/actions/deleteOrder";

import AddDiscount from "wholesale/orders/partials/addDiscount";

import tableDefs from "defs/tables/orderLineItems";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            showModal: false,
            current: {},
            btnLoading: false
        };
    }

    buildLineItems = items => items.map(item => {
        return {
            id: item.id,
            name: item.name,
            production_options: item.production_options,
            variant_id: item.variant_id,
            size: item.size,
            unit_price: item.unit_price,
            total_price: item.total_price,
            quantity: item.quantity
        };
    })

    toggleEditable = () => {
        const { order: { attributes } } = this.props;
        const items = attributes ? attributes.order_items : [];
        const lineItems = this.buildLineItems(items);
        this.setState(prevState => ({ isEditable: !prevState.isEditable, lineItems }));
    };

    handleTableClick = (e, item) => this.setState({ showModal: true, current: item });

    closeModal = () => this.setState({ showModal: false, current: {} });

    handleSubmit = async e => {
        e.preventDefault();
        const { lineItems } = this.state;
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { order: { id } } = this.props;
        const url = API_URL + "/orders/" + id;
        const body = { update_items: true, line_items: lineItems };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        // TODO Handle errors
        const { updateContext } = this.props;
        await setTimeout( async () => {
            await updateContext({ order: response.data });
            await this.setState({ btnLoading: false, isEditable: false });
        }, 600 );
    }

    updateLineItems = lineItem => {
        this.setState(prevState => {
            const exists = prevState.lineItems.findIndex( item => item.id === lineItem.id );
            let { lineItems } = prevState;
            if( exists > -1 ){
                if( lineItem.shouldDelete ){
                    lineItems.splice(exists, 1);
                    return { lineItems };
                }
                lineItems[exists] = lineItem;
            } else {
                lineItems = [...lineItems, lineItem];
            }
            return { lineItems };
        });
    };

    modifiedTableDefs = defs => {
        const WrappedPacker = (props) => {
            const { updateContext, order: { id } } = this.props;
            return <Packer {...props} updateContext={updateContext} id={id} fromOrder />;
        };
        const packer = {
            name: 'packed',
            style: { width: 60, position: "relative" },
            formatter: WrappedPacker,
            textAlign: "center"
        };
        let { fields, ...rest } = defs;
        rest.fields = [packer, ...fields];
        return rest;
    };

    render() {
        const { isEditable, showModal, current, lineItems, btnLoading } = this.state;
        const {
            order: { attributes = {}, id },
            profile: { attributes: roasterAtts },
            customer: { attributes: customerAtts },
            products,
            updateContext
        } = this.props;
        const order_items = attributes ? attributes.order_items : [];
        const line_items = isEditable ? lineItems : order_items;
        const sorted =
            line_items && line_items.length
                ? sortBy({ collection: line_items, id: "size", sorts: [{ name: "name" }, { name: "size" }] })
                : [];
        const closed = attributes.status === "fulfilled";
        const order_shipping_method = attributes ? attributes.order_shipping_method : {carrier: "unknown", service: ""};
        const shipping_method = `${order_shipping_method.carrier} ${order_shipping_method.service}`;
        const canEdit = ["processing", "packed"].includes(attributes.status);

        return (
            <div>
                <style type="text/css">
                    {styles}
                </style>
                <Segment className="print-order">
                    {showModal && (
                        <Modal
                            isOpen={showModal}
                            closeModal={this.closeModal}
                            title="Edit Line Item"
                            component={<LineItem current={current} updateLineItems={this.updateLineItems} />}
                        />
                    )}
                    
                    <Header as="h2" content="Order Details" dividing />
                    <p>
                        <a href="/manage/orders">Back to All Orders</a>
                    </p>
                    <OrderFulfillment />
                    <Segment style={{ maxWidth: 900, margin: "40px auto" }} className="printarea">
                        <div>
                            {!isEditable && canEdit && (
                                <Flex spacing="20" spacebetween>
                                    <div>
                                        <Button
                                            onClick={this.toggleEditable}
                                            content="Edit Order"
                                            primary
                                            className="noprint"
                                        />
                                    </div>
                                    <div>
                                        <DeleteOrder id={id} />
                                    </div>
                                </Flex>
                            )}
                            {isEditable && (
                                <Flex spacebetween spacing="20">
                                    <div>
                                        <Button onClick={this.toggleEditable} content="Cancel Changes" negative basic />
                                    </div>
                                    <div>
                                        <Button 
                                            onClick={this.handleSubmit}
                                            content="Save Changes"
                                            primary
                                            loading={btnLoading}
                                        />
                                    </div>
                                </Flex>
                            )}
                            <br />
                        </div>
                        {!isEditable && (
                            <>
                                <Label
                                    size="large"
                                    ribbon="right"
                                    content={closed ? "Closed" : "Open"}
                                    color={closed ? "black" : "green"}
                                    className="noprint"
                                />
                                <Flex spacing="30" spacebetween>
                                    <div flex="66" style={{ position: "relative" }}>
                                        <OrderAddresses roaster={roasterAtts} customer={customerAtts} />
                                    </div>
                                    <div flex="33" style={{ textAlign: "right" }}>
                                        <OrderDetails attributes={attributes} id={id} />
                                    </div>
                                </Flex>
                            </>
                        )}
                        
                        <br />
                        {isEditable && (
                            <>
                                <Modal
                                    text="Add Line Item"
                                    btnProps={{
                                        icon: <Icon name="plus circle" inverted />,
                                        size: "large"
                                    }}
                                    title="Add New Line Item"
                                    component={(
                                        <LineItem
                                            updateLineItems={this.updateLineItems}
                                            products={products}
                                        />
                                    )}
                                />
                                <br />
                                <br />
                            </>
                        )}
                        <Table 
                            tableDefs={isEditable ? tableDefs : this.modifiedTableDefs(tableDefs)}
                            data={sorted}
                            onClick={isEditable ? this.handleTableClick : null}
                        />
                        <br />
                        {!isEditable && (
                            <>
                                <Flex spacing="30" spacebetween>
                                    <div flex="66">
                                        <Titler
                                            title="Selected Shipping Method"
                                            value={shipping_method}
                                            bold
                                        />
                                        {!isEditable && canEdit && (
                                            <Flex wrap spacing="10" className="noprint">
                                                <div flex="auto">
                                                    <Modal
                                                        text="Update Shipping Method"
                                                        title="Update Shipping Method"
                                                        component={(
                                                            <EditShipping
                                                                order_id={id}
                                                                wholesale_profile_id={customerAtts.wholesale_profile.id}
                                                                shipping_method={order_shipping_method}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div flex="auto">
                                                    <Modal
                                                        text="Manually Adjust Shipping"
                                                        title="Manually Adjust Shipping"
                                                        btnProps={{
                                                            primary: false
                                                        }}
                                                        component={(
                                                            <ManualShipping
                                                                order_id={id}
                                                                shipping_method={order_shipping_method}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </Flex>
                                        )}
                                        {attributes.notes && (
                                            <React.Fragment>
                                                <br />
                                                <br />
                                                <p>
                                                    <strong>Order Notes:</strong>
                                                </p>
                                                <Segment secondary>{attributes.notes}</Segment>
                                            </React.Fragment>
                                        )}
                                    </div>
                                    <div flex="33" style={{ textAlign: "right", marginTop: "auto" }}>
                                        <div>
                                            {!isEditable && canEdit && (
                                                <div className="noprint">
                                                    <AddDiscount
                                                        id={attributes.invoice.id}
                                                        updateContext={updateContext}
                                                        discount={attributes.invoice.discount}
                                                    />
                                                    <br />
                                                    <br />
                                                </div>
                                            )}
                                            <OrderTotals attributes={attributes} />
                                        </div>
                                    </div>
                                </Flex>
                            </>
                        )}
                    </Segment>
                    {!isEditable && (
                        <Segment>
                            <Fulfillment />
                        </Segment>
                    )}
                </Segment>
            </div>
        );
    }
}

const { object, array, func } = PropTypes;
Order.propTypes = {
    order: object,
    profile: object,
    customer: object,
    products: array,
    updateContext: func
};

export default withContext(Order);
