import React from "react";
import { Segment } from "semantic-ui-react";

/* eslint-disable */
import CustomerPayment from "payments/customer";
/* eslint-enable */

// eslint-disable-next-line react/prefer-stateless-function
class PaymentWrapper extends React.PureComponent {
    render() {
        return (
            <Segment>
                <CustomerPayment />
            </Segment>
        );
    }
}

export default PaymentWrapper;