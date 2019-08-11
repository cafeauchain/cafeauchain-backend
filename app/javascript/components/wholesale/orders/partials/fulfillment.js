import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Titler from "shared/titler";
import Modal from "shared/modal";

import Tracking from "wholesale/orders/partials/addTracking";
/* eslint-enable */

class Fulfillment extends React.PureComponent {
    render() {
        const { order } = this.props;
        const { order_items, order_shipping_method } = order;
        const packed = order_items.reduce((total, item) => {
            if( item.packed ) total += 1;
            return total;
        }, 0 );
        const packedDisplay = packed + "/" + order_items.length;
        const hasTrackingNumber = !!order_shipping_method.tracking_number;
        const trackingText = hasTrackingNumber ? "Update" : "Add";
        return (
            <F>
                <Header at="h3" dividing content="Order Fulfillment Status" />
                <p>
                    <Titler bold title="Line Items Packed" value={packedDisplay} linebreak />
                </p>
                
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
                        <Modal
                            size="small"
                            title={trackingText + " Tracking Number"}
                            text={trackingText + " Tracking Number"}
                            component={<Tracking />}
                        />
                    </F>
                    
                )}
            </F>
        );
    }
}

const { object } = PropTypes;
Fulfillment.propTypes = {
    order: object
};

export default Fulfillment;
