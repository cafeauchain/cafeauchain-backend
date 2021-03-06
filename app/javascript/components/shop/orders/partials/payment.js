import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "semantic-ui-react";

/* eslint-disable */
import Modal from "shared/modal";
import ErrorHandler from "shared/errorHandler";
import Flex from "shared/flex";

import CartChangePayment from "shop/cart/changePayment";
import MiniCard from "payments/miniCard";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class CustomerPay extends React.Component {
    constructor(props) {
        super(props);
        const { cards } = this.props;
        const card = cards.find(card => card.default);
        const payment_source = card.stripe_card_id;
        this.state = {
            payment_source,
            btnLoading: false,
            errors: []
        };
    }

    updatePayment = obj => {
        this.setState({ payment_source: obj.payment_source });
    }

    payInvoice = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { id } = this.props;
        const { payment_source } = this.state;
        const url = API_URL + "/invoices/" + id;
        const response = await requester({ url, body: { payment_source }, method: 'PUT' });
        this.afterSubmit(response);
    }

    afterSubmit = async response => {
        setTimeout(() => {
            if (response instanceof Error) {
                this.setState({ btnLoading: false, errors: [response.response.data] });
            } else {
                const { updateContext } = this.props;
                this.setState({ btnLoading: false });
                updateContext({ order: response.data });
            }
        }, 400);
    }

    render() {
        const { cards, stripeApiKey } = this.props;
        const { payment_source, btnLoading, errors } = this.state;
        const card = cards.find(card => card.stripe_card_id === payment_source);
        return (
            <Card>
                <ErrorHandler errors={errors} />
                <div style={{ padding: 20 }}>
                    <Flex centermain spacing="20">
                        <div flex="50" style={{ textAlign: "right" }}>
                            <MiniCard card={card} />
                        </div>
                        <div flex="50">
                            <Modal
                                text="Change"
                                title="Change Payment Method"
                                unstyled
                                className="link"
                                component={(
                                    <CartChangePayment
                                        cards={cards}
                                        updateCartDetails={this.updatePayment}
                                        payment_source={payment_source}
                                        stripeApiKey={stripeApiKey}
                                    />
                                )}
                            />
                        </div>
                    </Flex>
                </div> 
                <Button primary content="Pay Invoice" onClick={this.payInvoice} loading={btnLoading} fluid />
            </Card>
        );
    }
}

const { array, string, oneOfType, number, func } = PropTypes;
CustomerPay.propTypes = {
    cards: array,
    stripeApiKey: string,
    id: oneOfType([ number, string ]),
    updateContext: func
};
export default withContext(CustomerPay);
