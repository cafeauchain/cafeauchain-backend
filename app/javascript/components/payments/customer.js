import React, { Component } from "react";
import PropTypes from "prop-types";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Divider, Grid, Header, Icon, Message, Segment, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { url as API_URL, requester } from "utilities/apiUtils";
import { sortBy } from "utilities";

import CardForm from "shared/CardForm";
import CardView from "payments/CardView";
import withContext from "contexts/withContext";
/* eslint-enable */

class CustomerPayment extends Component {
    constructor(props) {
        super(props);
        const { profile: { id: profileId } } = props;
        this.state = {
            cards: props.cards || [],
            errors: {},
            loading: false
        };
        this.requestUrl = API_URL + "/customers/" + profileId;
    }

    sortCards = cards => {
        return sortBy({ collection: cards, id: "id", sorts: [{ name: "default", desc: true }] });
    };

    setAsDefault = async card_id => {
        this.setState({ loading: true });
        const url = this.requestUrl + "/set_as_default";
        const body = { card_id };

        const respJSON = await requester({ url, body, method: 'PUT' });
        this.updateCards(respJSON);
    };

    removeCard = async card_id => {
        this.setState({ loading: true });
        const url = this.requestUrl + "/remove_card";
        const body = { card_id };

        const respJSON = await requester({ url, body, method: 'DELETE' });
        this.updateCards(respJSON);
    };

    handleSubmit = async (token, setAsDefault) => {
        this.setState({ loading: true });
        const url = this.requestUrl + "/cards";
        const body = { token: token.id, setAsDefault };

        const respJSON = await requester({ url, body });
        this.updateCards(respJSON);
    };

    updateCards = data => {
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
            this.setState({ loading: false });
        } else {
            // eslint-disable-next-line
            console.log("success", data);
            const cards = this.sortCards(data);
            this.setState({ cards, loading: false });
        }
    };

    renderCards = cards => {
        return cards.map(card => (
            <CardView key={card.id} setAsDefault={this.setAsDefault} removeCard={this.removeCard} card={card} />
        ));
    };

    renderErrors = () => {
        const { errors } = this.state;
        if (Object.keys(errors).length > 0) {
            const errorMessages = [];
            const keys = Object.keys(errors);
            keys.forEach(key => {
                errorMessages.push(errors[key]);
            });
            return (
                <Message warning visible>
                    <Message.Header>There was an issue:</Message.Header>
                    <Message.List items={errorMessages} />
                </Message>
            );
        }
    };

    render() {
        const { cards, loading } = this.state;
        const { stripeApiKey, profile: { attributes: { company_name } } } = this.props;

        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Segment>
                    <h2>Manage Payment Methods</h2>
                    <Elements>
                        <CardForm handleSubmit={this.handleSubmit} name={company_name} />
                    </Elements>
                    {this.renderErrors()}
                    {cards.length > 0 && (
                        <React.Fragment>
                            <Divider horizontal>
                                <Header as="h4">
                                    <Icon name="credit card outline" />
                                    Your cards
                                </Header>
                            </Divider>

                            <Grid columns={3} stretched style={{ position: "relative" }}>
                                <Dimmer active={loading} inverted>
                                    <Loader active={loading} size="large" />
                                </Dimmer>
                                {this.renderCards(cards)}
                            </Grid>
                        </React.Fragment>
                    )}
                </Segment>
            </StripeProvider>
        );
    }
}

const { array, object, string } = PropTypes;
CustomerPayment.propTypes = {
    stripeApiKey: string,
    cards: array,
    profile: object
};

export default withContext(CustomerPayment);
