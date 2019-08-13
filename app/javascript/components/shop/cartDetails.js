import React from "react";
import PropTypes from "prop-types";
import { Header, Card, Button, Statistic, Loader, Dimmer } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, Weights } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";
import Modal from "shared/modal";

import ShippingOptions from "shop/shipping/options"
import CustomerAddresses from "shop/customer/addresses";
import MiniDetails from "shop/cartMiniDetails";

import CartChangePayment from "shop/cart/changePayment";
import MiniCard from "payments/miniCard";

import { humanize, pluralize } from "utilities";
import { url as API_URL, requester } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class CartDetails extends React.Component {
    constructor(props) {
        super(props);
        const { cart: { attributes: { shipping_rates } }, cards, profile: { attributes: { terms } } } = props;
        const shippingIndex = shipping_rates.findIndex(rate => {
            return (rate.service === "FEDEX_GROUND") || (rate.service === "Ground") || (rate.service === "Priority");
        });
        const defaultRate = shippingIndex > -1 ? shippingIndex : 0;
        const card = cards.find( card => card.default );
        const payment_source = card.stripe_card_id; 
        this.state = {
            errors: [],
            shippingIdx: defaultRate,
            payment_type: terms ? "terms_with_vendor" : "card_on_file",
            payment_source: !terms ? payment_source : undefined,
            btnLoading: false
        };
    }

    updateCartDetails = obj => {
        this.setState( obj );
    }

    handleSubmit = async ( e, item ) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { 
            cart: { id, attributes: { shipping_rates } }, 
            profile: { id: customer_profile_id }, 
            isAssumedCustomer 
        } = this.props;
        const url = `${API_URL}/orders`;
        const { payment_type, payment_source, shippingIdx } = this.state;
        const shipping = shipping_rates[shippingIdx];
        const tax = item["data-tax"];
        const total = item["data-total"];
        const body = { id, payment_type, payment_source, shipping, tax, total, customer_profile_id, isAssumedCustomer };
        const response = await requester({ url, body });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
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
            cards,
            stripeApiKey,
            cartLoading
        } = this.props;
        const { primary_address: { street_1, street_2, city, state, postal_code } } = profileAttrs; 
        const { errors, shippingIdx, payment_type, payment_source, btnLoading } = this.state;
        const shipping =attributes.shipping_rates[shippingIdx];
        const speed = Number(shipping.est_delivery_days);
        const speedString = speed ? pluralize(speed, ' day') : "Unknown";
        
        // TODO Consider moving these calculations to the backend
        const cartTotal = (Number(attributes.total_price) + Number(shipping.retail_rate)).toFixed(2);
        const tax_due = (Number(profileAttrs.wholesale_profile.tax_rate) * Number(cartTotal) / 100).toFixed(2);
        const orderTotal = (Number(cartTotal) + Number(tax_due)).toFixed(2);

        const card = cards.find( card => card.stripe_card_id === payment_source );
        return (
            <Card fluid>
                <Dimmer active={cartLoading} inverted>
                    <Loader active={cartLoading} size="large" />
                </Dimmer>
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
                <Card.Content>
                    {attributes.cart_items.map(item => <MiniDetails key={item.id} item={item} />)}
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
                    <Flex spacebetween spacing="10">
                        <span>Subtotal: </span>
                        <span>
                            <Money>{attributes.total_price}</Money>
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
                                rates={attributes.shipping_rates}
                                updateCartDetails={this.updateCartDetails}
                                current={shipping}
                            />
                        )}
                    />
                </Card.Content>
                <Card.Content>
                    <p><strong>Taxes</strong></p>
                    <Flex spacebetween spacing="10">
                        <span>Rate: </span>
                        <span>
                            {profileAttrs.wholesale_profile.tax_rate + "%"}
                        </span>
                    </Flex>
                    <Flex spacebetween spacing="10">
                        <span>Tax Due: </span>
                        <span>
                            <Money>{tax_due}</Money>
                        </span>
                    </Flex>
                </Card.Content>
                <Card.Content>
                    <p><strong>Payment</strong></p>
                    {payment_type === "terms_with_vendor" && (
                        <div>
                            {profileAttrs.terms}
                        </div>
                    )}
                    {payment_type === "card_on_file" && (
                        <div>
                            <MiniCard card={card} />
                        </div>
                        
                    )}
                    <Modal
                        text="Change"
                        title="Change Payment Method"
                        unstyled
                        className="link"
                        component={(
                            <CartChangePayment 
                                cards={cards}
                                updateCartDetails={this.updateCartDetails}
                                payment_source={payment_source}
                                terms={profileAttrs.terms}
                                stripeApiKey={stripeApiKey}
                            />
                        )}
                    />
                </Card.Content>
                <Card.Content>
                    <Flex spacebetween centercross spacing="10">
                        <Statistic size="mini">
                            <Statistic.Label>Total</Statistic.Label>
                            <Statistic.Value>
                                <Money type="postive">{orderTotal}</Money>
                            </Statistic.Value>
                        </Statistic>
                        <div>
                            <Button
                                content="Place Order"
                                primary
                                icon="right arrow"
                                labelPosition="right"
                                onClick={this.handleSubmit}
                                data-shipping={shipping.retail_rate}
                                data-tax={tax_due}
                                data-total={orderTotal}
                                loading={btnLoading}
                            />
                        </div>
                    </Flex>
                </Card.Content>
            </Card>
        );
    }
}

const { object, array, string, bool } = PropTypes;
CartDetails.propTypes = {
    cart: object,
    profile: object,
    cards: array,
    stripeApiKey: string,
    cartLoading: bool,
    isAssumedCustomer: bool
};

export default withContext(CartDetails);
