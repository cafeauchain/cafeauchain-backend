import React from "react";
import { Segment } from "semantic-ui-react";

/* eslint-disable */
import CustomerAddresses from "shop/customer/addresses";
/* eslint-enable */

// eslint-disable-next-line react/prefer-stateless-function
class AddressesWrapper extends React.PureComponent {
    render() {
        return (
            <Segment>
                <CustomerAddresses />
            </Segment>
        );
    }
}

export default AddressesWrapper;