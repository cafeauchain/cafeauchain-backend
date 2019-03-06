import React from "react";
import PropTypes from "prop-types";
import { Header, Card, Button, Statistic } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money, Weights } from "shared/textFormatters";
/* eslint-enable */

class CartDetails extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            attributes: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { attributes } = this.props;
        // TODO Use real address and allow them to change
        // Either prefined or on the fly
        const shipping = "18.68";
        return (
            <Card fluid>
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
                                <Money type="postive">{Number(attributes.total_price) + Number(shipping)}</Money>
                            </Statistic.Value>
                        </Statistic>
                        <div>
                            <Button content="Place Order" primary icon="right arrow" labelPosition="right" />
                        </div>
                    </Flex>
                </Card.Content>
            </Card>
        );
    }
}

export default CartDetails;
