import React from "react";
import PropTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";
import Titler from "shared/titler";
import Modal from "shared/modal";

import MarkPaid from "wholesale/orders/partials/markPaid";
import EditPaidDate from "wholesale/orders/partials/editPaidDate";

import { humanize, callMeDanger } from "utilities";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class PaymentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardBtnLoading: false,
            emailBtnLoading: false,
            errors: []
        };
    }
    handleChargeDefaultCard = async e => {
        const { url, custAtts, order_id } = await this.handlePayment(e);
        const default_card = custAtts.cards.find(card => card.default);
        const body = { card: default_card.stripe_card_id, order_id };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit( response );
    }
    handleProcessAuthorizedCard = async e => {
        const { url, order_id } = await this.handlePayment(e);
        const body = { order_id };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit(response);
    }
    handlePayment = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ cardBtnLoading: true });
        const { customer: { attributes: custAtts, id }, order: { id: order_id } } = this.props;
        const url = API_URL + "/customers/" + id + "/process_payment";
        return { url, custAtts, order_id };
    }
    handleRequestPayment = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        console.log('request payment - send email');
        this.setState({ emailBtnLoading: true });
        // await this.setState({ btnLoading: true });
    }
    afterSubmit = response => {
        setTimeout(async () => {
            this.setState({ cardBtnLoading: false, emailBtnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.message] });
            } else {
                const { updateContext } = this.props;
                await updateContext({ order: response.data });
            }
        }, 400);
    }
    render() {
        const { errors, cardBtnLoading, emailBtnLoading } = this.state;
        const { order: { attributes }, customer: { attributes: custAtts} } = this.props;
        const { invoice: { status, memo, payment_status, id, paid_date } } = attributes;
        const default_card = custAtts.cards.find( card => card.default );
        return (
            <React.Fragment>
                <Header as="h3" dividing content="Payment Details" />
                <p>
                    <Titler bold title="Invoice Status" value={humanize(status)} />
                </p>
                <p>
                    <span>
                        <strong>Invoice Payment Date</strong>
                        <span>: </span>
                    </span>
                    <Modal
                        text={moment(paid_date).format("MMM D, YYYY")}
                        title="Edit Paid Date"
                        unstyled
                        className="link"
                        size="mini"
                        component={(
                            <EditPaidDate id={id} paid_date={paid_date} />
                        )}
                    />
                </p>
                
                
                {status === "awaiting_payment" && (
                    <p>
                        {callMeDanger(`Awaiting payment means that this customer was not required to submit payment 
                        when they placed an order and this order has been marked as shipped. You can either 
                        charge the customer's default payment method, wait for the customer to pay the invoice
                        on their end, or mark the order as paid with an off-platform method like cash or check.`)}
                    </p>  
                )}
                {status === "payment_authorized" && (
                    <p>
                        {callMeDanger(`Payment authorized means that the customer used a card when placing the 
                        order. As soon as the order is finalized and shipped, you can charge the customer's 
                        payment method.`)}
                    </p>  
                )}
                {status === "paid_in_full" && (
                    <p>
                        <Titler bold title="Payment Memo" value={memo} />
                    </p>
                )}
                {payment_status === "stripe" && status !== 'paid_in_full'  && (
                    <p>
                        <Titler bold title="Default Card" value={default_card.brand + " " + default_card.last4} />
                    </p>    
                )}
                {status === "payment_authorized" && (
                    <React.Fragment>
                        <ErrorHandler errors={errors} />
                        <Button
                            primary
                            content="Charge Card"
                            onClick={this.handleProcessAuthorizedCard}
                            loading={cardBtnLoading}
                        />
                    </React.Fragment>
                )}
                
                {status === "awaiting_payment" && (
                    <React.Fragment>
                        <ErrorHandler errors={errors} />
                        <Button 
                            primary
                            content="Charge Default Card"
                            onClick={this.handleChargeDefaultCard}
                            loading={cardBtnLoading}
                        />
                        {/* <br />
                        <br />
                        <Button 
                            primary
                            content="Send Payment Request"
                            onClick={this.handleRequestPayment}
                            loading={emailBtnLoading}
                        /> */}
                        <br />
                        <br />
                        <Modal
                            title="Mark Invoice Paid"
                            text="Mark Paid"
                            component={<MarkPaid invoice_id={id} />}
                            btnProps={{ primary: false }}
                        />
                    </React.Fragment> 
                )}
            </React.Fragment> 
        );
    }
}

const { object, func } = PropTypes;
PaymentDetails.propTypes = {
    order: object,
    customer: object,
    updateContext: func
};

export default withContext(PaymentDetails);
