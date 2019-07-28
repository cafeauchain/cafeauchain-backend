import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
/* eslint-enable */

class OrderTotals extends PureComponent {
    render() {
        const { attributes: { subtotal, taxes, shipping, order_total } } = this.props;
        return (
            <Flex spacing="10" spacebetween wrap>
                <div flex="50">
                    <strong>Subtotal: </strong>
                </div>
                <div flex="50">
                    <Money>{subtotal}</Money>
                </div>
                <div flex="50">
                    <strong>Tax:</strong>
                </div>
                <div flex="50">
                    <Money>{taxes}</Money>
                </div>
                <div flex="50">
                    <strong>Shipping:</strong>
                </div>
                <div flex="50">
                    <Money>{shipping}</Money>
                </div>
                <div flex="50">
                    <strong>Total:</strong>
                </div>
                <div flex="50">
                    <Money type="positive">{order_total}</Money>
                </div>
            </Flex>
        );
    }
}

const { object } = PropTypes;
OrderTotals.propTypes = {
    attributes: object
};

export default OrderTotals;
