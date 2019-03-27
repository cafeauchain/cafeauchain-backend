import React from "react";
import PropTypes from "prop-types";
import { Segment, Card, Button, Label, Divider } from "semantic-ui-react";

import { Elements, StripeProvider } from "react-stripe-elements";

/* eslint-disable */
import Flex from "shared/flex";;

import CardForm from "shared/CardForm";
import MiniCard from "payments/miniCard";
/* eslint-enable */

class CartChangePayment extends React.Component {
    static propTypes = () => {
        const { array, oneOfType, number, string } = PropTypes;
        return {
            cards: array,
            cardId: oneOfType([ number, string ])
        };
    };
    constructor(props) {
        super(props);
        const { terms, payment_source } = props;
        this.state = {
            selected: payment_source || terms
        };
    }

    handleSourceChange = ( e, item ) => {
        this.setState({ selected: item["data-id"] });
    }

    updateSource = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const { selected } = this.state;
        const { cards, updateCartDetails, successClose, closeModal } = this.props;
        const card = cards.find( card => card.stripe_card_id.toString() === selected.toString() );
        const payment_type = card ? 'card_on_file' : 'terms_with_vendor';
        const payment_source = card ? card.stripe_card_id : undefined;
        await updateCartDetails({ payment_source, payment_type });
        if( successClose ){
            successClose('Payment Updated!');
        } else if (closeModal) {
            closeModal();
        }
    }

    render() {
        const { cards, terms, stripeApiKey } = this.props;
        const { selected } = this.state;
        return (
            <div>
                <Flex spacing="10" centermain wrap>
                    {terms && (
                        <div flex="50" style={{ marginBottom: 20 }}>
                            <Card style={{ height: '100%' }} onClick={this.handleSourceChange} data-id={terms}>
                                <Card.Content>
                                    <Card.Header>
                                        Use Payment Terms
                                        {selected === terms && <Label color="green" corner="right" icon="asterisk" />}
                                    </Card.Header>
                                    <Card.Description>
                                        {terms}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    )}
                    {cards.map(({ name, stripe_card_id: id, ...rest }) => {
                        return (
                            <div flex="50" key={id} style={{ marginBottom: 20 }}>
                                <Card onClick={this.handleSourceChange} data-id={id}>
                                    <Card.Content>
                                        <Card.Header>
                                            {name}
                                            {selected === id && <Label color="green" corner="right" icon="asterisk" />}
                                        </Card.Header>
                                        <Card.Description>
                                            <MiniCard card={rest} />
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </div>
                        );
                    })}
                </Flex>
                <Flex flexend>
                    <Button primary content="Update Payment Method" onClick={this.updateSource} />
                </Flex>
                {false && (
                    <React.Fragment>
                        <Divider />
                        <StripeProvider apiKey={stripeApiKey}>
                            <Segment>
                                <h2>Add New Card</h2>
                                <Elements>
                                    <CardForm handleSubmit={this.handleSubmit} />
                                </Elements>
                            </Segment>
                        </StripeProvider>
                    </React.Fragment>
                    
                )}
                
            </div>
        );
    }
}

export default CartChangePayment;
