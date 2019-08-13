import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Titler from "shared/titler";
import Modal from "shared/modal";
import ErrorHandler from "shared/errorHandler";

import Tracking from "wholesale/orders/partials/addTracking";
import PaymentDetails from "wholesale/orders/partials/payment";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Fulfillment extends React.Component {
    state = {
        btnLoading: false,
        errors: []
    }
    handleDelivered = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { order: { id } } = this.props;
        const url = API_URL + "/orders/" + id;
        const body = { status: 'fulfilled' };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response] });
            } else {
                const { updateContext } = this.props;
                await updateContext({ order: response.data });
            }
        }, 400);
    }
    render() {
        const { btnLoading, errors } = this.state;
        const { order: { attributes } } = this.props;
        const { order_items, order_shipping_method, status } = attributes;
        const packed = order_items.reduce((total, item) => {
            if( item.packed ) total += 1;
            return total;
        }, 0 );
        const packedDisplay = packed + "/" + order_items.length;
        const hasTrackingNumber = !!order_shipping_method.tracking_number;
        const isTrackingEditable = ["packed", "shipped"].includes( status );
        const trackingText = hasTrackingNumber ? "Update" : "Add";
        return (
            <F>
                <Header at="h3" dividing content="Order Fulfillment Status" />
                <p>
                    <Titler bold title="Line Items Packed" value={packedDisplay} linebreak />
                </p>
                {errors.length > 0 && <ErrorHandler errors={errors} />}
                {packed !== order_items.length && (
                    <p>
                        <a href="/manage/production">View Production Queue</a>
                    </p>
                )}
                {packed === order_items.length && (
                    <F>
                        {hasTrackingNumber && (
                            <Titler 
                                bold
                                title="Tracking Number"
                                value={order_shipping_method.tracking_number}
                                linebreak 
                            />
                        )}
                        {isTrackingEditable && (
                            <React.Fragment>
                                <Modal
                                    size="small"
                                    title={trackingText + " Tracking Number"}
                                    text={trackingText + " Tracking Number"}
                                    component={<Tracking />}
                                />
                                {hasTrackingNumber && (
                                    <Button
                                        content="Mark Delivered"
                                        onClick={this.handleDelivered}
                                        loading={btnLoading}
                                    />
                                )}
                            </React.Fragment>
                        )}
                        
                    </F>
                    
                )}
                <PaymentDetails />
            </F>
        );
    }
}

const { object, func } = PropTypes;
Fulfillment.propTypes = {
    order: object,
    updateContext: func
};

export default withContext(Fulfillment);
