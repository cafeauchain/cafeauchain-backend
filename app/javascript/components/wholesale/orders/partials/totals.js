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
                invoice_details
            }, 
            isCustomer 
        } = this.props;
        const {
            base_total,
            customer_discount_amount,
            invoice_discount,
            discounted_total: subtotal,
            tax: taxes,
            shipping_amount: shipping,
            order_total,
            invoice_fee,
            order_net,
            customer_discount,
            customer_discount_applied,
            invoice_discount_applied
        } = invoice_details;
        return (
            <>
                {(customer_discount_applied || invoice_discount_applied) && (
                    <>
                        <Flex spacing="10" spacebetween wrap>
                            <div flex="50">
                                <strong>Order Total: </strong>
                            </div>
                            <div flex="50">
                                <Money>{base_total}</Money>
                            </div>
                        </Flex>
                        {customer_discount_applied && (
                            <>
                                <div style={{ color: styles.darkgray, fontSize: 13 }}>
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
                            </>
                        )}
                        {invoice_discount_applied && (
                            <>
                                <div style={{ color: styles.darkgray, fontSize: 13 }}>
                                    <strong>Invoice Discount</strong>
                                </div>
                                <Flex spacing="10" spacebetween wrap>
                                    <div flex="50">
                                        <strong>Discount: </strong>
                                    </div>
                                    <div flex="50">
                                        <PosMoney>{0 - invoice_discount}</PosMoney>
                                    </div>
                                </Flex>
                            </>
                        )} 
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
            </>
        );
    }
}

const { object, bool } = PropTypes;
OrderTotals.propTypes = {
    attributes: object,
    isCustomer: bool
};

export default OrderTotals;
