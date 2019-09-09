import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, PosMoney } from "shared/textFormatters";
import styles from "stylesheets/variables";
/* eslint-enable */

class OrderTotals extends PureComponent {
    render() {
        const { 
            attributes: { 
                subtotal, taxes, shipping, order_total, invoice_fee, order_net, full_total, customer_discount,
                customer_discount_amount
            }, 
            isCustomer 
        } = this.props;
        return (
            <React.Fragment>
                {customer_discount && (
                    <>
                    <Flex spacing="10" spacebetween wrap>
                        <div flex="50">
                            <strong>Order Total: </strong>
                        </div>
                        <div flex="50">
                            <Money>{full_total}</Money>
                        </div>
                    </Flex>
                    <div style={{ margin: "6px 0", color: styles.darkgray, fontSize: 13 }}>
                        <strong>
                            {customer_discount}
                            <span>% Customer Discount</span>
                        </strong>
                    </div>
                    <Flex spacing="10" spacebetween wrap>
                        <div flex="50">
                            <strong>Discount: </strong>
                        </div>
                        <div flex="50">
                            <PosMoney>{0 - customer_discount_amount}</PosMoney>
                        </div>
                    </Flex>
                    <Divider />
                    </>
                )}
                <Flex spacing="10" spacebetween wrap>
                    <div flex="50">
                        <strong>Subtotal: </strong>
                    </div>
                    <div flex="50">
                        <Money>{subtotal}</Money>
                    </div>
                </Flex>
                <Flex spacing="10" spacebetween wrap>
                    <div flex="50">
                        <strong>Shipping:</strong>
                    </div>
                    <div flex="50">
                        <Money>{shipping}</Money>
                    </div>
                    <div flex="50">
                        <strong>Tax:</strong>
                    </div>
                    <div flex="50">
                        <Money>{taxes}</Money>
                    </div>
                    <div flex="50">
                        <strong>Total:</strong>
                    </div>
                    <div flex="50">
                        <Money type="positive">{order_total}</Money>
                    </div>
                </Flex>
                {!isCustomer && (
                    <Flex spacing="10" spacebetween wrap>
                        <div flex="50">
                            <strong>Fee:</strong>
                        </div>
                        <div flex="50">
                            <Money type="negative">{invoice_fee}</Money>
                        </div>
                        <div flex="50">
                            <strong>Net:</strong>
                        </div>
                        <div flex="50">
                            <Money type="positive">{order_net}</Money>
                        </div>
                    </Flex>
                )}
            </React.Fragment>
        );
    }
}

const { object, bool } = PropTypes;
OrderTotals.propTypes = {
    attributes: object,
    isCustomer: bool
};

export default OrderTotals;
