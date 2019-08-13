import React from "react";
import PropTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";
import Titler from "shared/titler";
import Modal from "shared/modal";

import MarkPaid from "wholesale/orders/partials/markPaid";

import { humanize } from "utilities";

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
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ cardBtnLoading: true });
        const { customer: { attributes: custAtts, id }, order: { id: order_id } } = this.props;
        const default_card = custAtts.cards.find( card => card.default );
        const url = API_URL + "/customers/" + id + "/process_payment";
        const body = { card: default_card.stripe_card_id, order: order_id };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit( response );
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
        const { invoice: { status, memo, payment_status, id } } = attributes;
        const default_card = custAtts.cards.find( card => card.default );
        return (
            <React.Fragment>
                <Header as="h3" dividing content="Payment Details" />
                <p>
                    <Titler bold title="Invoice Status" value={humanize(status)} />
                </p>
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
