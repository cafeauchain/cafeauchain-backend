import React from "react";
import PropTypes from "prop-types";
import { Header, Card, Button, Statistic } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, Weights } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";
import Modal from "shared/modal";

import ShippingOptions from "shop/shipping/options"
import CustomerAddresses from "shop/customer/addresses";

import { humanize } from "utilities";
import { url as API_URL, requester } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class CartDetails extends React.Component {
    static propTypes = () => {
        const { object, array } = PropTypes;
        return {
            cart: object,
            rates: array
        };
    };
    constructor(props) {
        super(props);
        const { rates } = props;
        const defaultRate = rates.find( rate => rate.service === "Priority" ) || rates[0];
        
        this.state = {
            errors: [],
            shipping: defaultRate
        };
    }

    updateCartDetails = obj => {
        this.setState( obj );
    }

    handleSubmit = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const { cart } = this.props;
        // eslint-disable-next-line
        console.log(cart);
        const url = `${API_URL}/orders`;
        // TODO Allow payment type to be  changed
        const body = { id: cart.id, payment_type: "terms_with_vendor" };
        const response = await requester({ url, body });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                // eslint-disable-next-line
                console.log("do something other than redirect to the orders/invoice page?");
                // eslint-disable-next-line
                console.log(response);
            }
        }
    };

    render() {
        const {
            cart: { attributes },
            profile: { attributes: profileAttrs },
            rates
        } = this.props;
        const { primary_address: { street_1, street_2, city, state, postal_code } } = profileAttrs; 
        const { errors, shipping } = this.state;
        const cartTotal = Number(attributes.total_price) + Number(shipping.retail_rate);
        const speed = Number(shipping.est_delivery_days);
        const pluralize = (val, str) => val + " " + (val > 1 ? str + "s" : str);
        const speedString = speed ? pluralize(speed, ' day') : "Unknown";
        return (
            <Card fluid>
                <ErrorHandler errors={errors} />
                <Header as="h2" content="Cart Details" attached />
                <Card.Content>
                    <Card.Description content="Shipping Address" />
                    <Card.Meta>
                        <div><strong>{profileAttrs.company_name}</strong></div>
                        <div>{street_1}</div>
                        {street_2 && (
                            <div>{street_2}</div>
                        )}
                        <div>{`${ city }, ${ state } ${ postal_code}`}</div>
                        <Modal 
                            text="Edit"
                            title="Edit Addresses"
                            unstyled
                            className="link"
                            component={<CustomerAddresses />}
                        />
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Flex spacebetween spacing="10">
                        <span>Total Line Items: </span>
                        <span>{attributes.total_line_items}</span>
                    </Flex>
                    <Flex spacebetween spacing="10">
                        <span>Total Items: </span>
                        <span>{attributes.total_items}</span>
                    </Flex>
                    <Flex spacebetween spacing="10">
                        <span>Total Weight: </span>
                        <span>
                            <Weights>{attributes.total_weight}</Weights>
                        </span>
                    </Flex>
                </Card.Content>
                <Card.Content>
                    <p><strong>Shipping</strong></p>
                    <Flex spacebetween spacing="10">
                        <span>Service: </span>
                        <span>
                            {humanize(shipping.service, true)}
                        </span>
                    </Flex>
                    <Flex spacebetween spacing="10">
                        <span>Shipping Estimate: </span>
                        <span>
                            {speedString}
                        </span>
                    </Flex>
                    <Flex spacebetween spacing="10">
                        <span>Price: </span>
                        <span>
                            <Money>{shipping.retail_rate}</Money>
                        </span>
                    </Flex>
                    <Modal
                        text="Edit"
                        title="Choose Shipping Options"
                        unstyled
                        className="link"
                        component={(
                            <ShippingOptions 
                                rates={rates}
                                updateCartDetails={this.updateCartDetails}
                                current={shipping}
                            />
                        )}
                    />
                </Card.Content>
                <Card.Content>
                    
                    <Flex spacebetween spacing="10">
                        <span>Subtotal: </span>
                        <span>
                            <Money>{attributes.total_price}</Money>
                        </span>
                    </Flex>
                </Card.Content>
                <Card.Content>
                    <Flex spacebetween centercross spacing="10">
                        <Statistic size="mini">
                            <Statistic.Label>Total</Statistic.Label>
                            <Statistic.Value>
                                <Money type="postive">{cartTotal}</Money>
                            </Statistic.Value>
                        </Statistic>
                        <div>
                            <Button
                                content="Place Order"
                                primary
                                icon="right arrow"
                                labelPosition="right"
                                onClick={this.handleSubmit}
                            />
                        </div>
                    </Flex>
                </Card.Content>
            </Card>
        );
    }
}

export default withContext(CartDetails);
