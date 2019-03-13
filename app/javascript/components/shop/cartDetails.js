import React from "react";
import PropTypes from "prop-types";
import { Header, Card, Button, Statistic } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, Weights } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

class CartDetails extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            cart: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
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
            cart: { attributes }
        } = this.props;
        const { errors } = this.state;
        // TODO Use real address and allow them to change
        // Either prefined or on the fly
        const shipping = "18.68";
        const cartTotal = Number(attributes.total_price) + Number(shipping);
        return (
            <Card fluid>
                <ErrorHandler errors={errors} />
                <Header as="h2" content="Cart Details" attached />
                <Card.Content>
                    <Card.Description content="Shipping Address" />
                    <Card.Meta>
                        <div>Attn: Wholesale Bob</div>
                        <div>123 Main Street</div>
                        <div>Suite 110</div>
                        <div>That One Place, MN 12345</div>
                        <Button className="unstyled link" content="Edit" />
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
                    <Flex spacebetween spacing="10">
                        <span>Estimated Shipping: </span>
                        <span>
                            <Money>{shipping}</Money>
                        </span>
                    </Flex>
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

export default CartDetails;
