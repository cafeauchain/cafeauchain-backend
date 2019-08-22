import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Titler from "shared/titler";

import { callMeDanger } from "utilities";

import CustomerPay from "shop/orders/partials/payment";
/* eslint-enable */

class PaymentDetails extends React.PureComponent {
    render(){
        const {
            attributes,
            ...custPayProps
        } = this.props;
        const invoice_status = attributes.invoice.status;

        return (
            <React.Fragment>
                {invoice_status === 'awaiting_payment' && (
                    <React.Fragment>
                        <Titler title="Payment Status" value="Awaiting Payment" bold />
                        <CustomerPay
                            {...custPayProps}
                            id={attributes.invoice.id}
                        />
                    </React.Fragment>

                )}
                {invoice_status === "processing" && (
                    <Titler title="Payment Status" value="Verifying Order" bold />
                )}
                {invoice_status === "payment_authorized" && (
                    <div style={{ textAlign: "left" }}>
                        <Titler title="Payment Status" value="Payment Authorized" bold />
                        <p>
                            {callMeDanger(`On checkout, you authorized your payment. Once your order
                                            is ready, your roaster will process this transaction.`)}
                        </p>
                    </div>
                )}
                {invoice_status === "paid_in_full" && (
                    <Titler
                        title="Payment Status"
                        value='<strong class="positive-text">PAID</strong>'
                        bold
                    />
                )}
            </React.Fragment>
        );
    }
}

const { object, array, string, func } = PropTypes;
PaymentDetails.propTypes = {
    attributes: object,
    cards: array,
    stripeApiKey: string,
    updateContext: func
};

export default PaymentDetails;