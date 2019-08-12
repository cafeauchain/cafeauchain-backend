import React from "react";
import PropTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";
import Titler from "shared/titler";

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
            paidBtnLoading: false,
            errors: []
        };
    }
    handleInputChange = (e, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };
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
    handleMarkPaid = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ cardBtnLoading: true });
        const { order: { attributes: { invoice: { id } } } } = this.props;
        const url = API_URL + "/invoices/" + id;
        const body = { status: "paid_in_full" };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit(response);
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
        const { errors, cardBtnLoading, emailBtnLoading, paidBtnLoading } = this.state;
        const { order: { attributes }, customer: { attributes: custAtts} } = this.props;
        const default_card = custAtts.cards.find( card => card.default );
        return (
            <React.Fragment>
                <Header as="h3" dividing content="Payment Details" />
                <p>
                    <Titler bold title="Invoice Status" value={humanize(attributes.invoice.status)} />
                </p>
                <p>
                    <Titler bold title="Default Card" value={default_card.brand + " " + default_card.last4} />
                </p>
                {attributes.invoice.status === "awaiting_payment" && (
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
                        <Button
                            content="Mark Paid"
                            onClick={this.handleMarkPaid}
                            loading={paidBtnLoading}
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
