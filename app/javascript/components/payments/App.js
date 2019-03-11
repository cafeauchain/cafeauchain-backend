import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Divider, Grid, Header, Icon, Message, Segment, Label, List, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { readCookie } from "utilities";
import { url as API_URL, requester, fetcher } from "utilities/apiUtils";
import { sortBy } from "utilities";

import { Money } from "shared/textFormatters";
import CardForm from "shared/CardForm";
import CardView from "payments/CardView";
/* eslint-enable */

class App extends Component {
    constructor(props) {
        super(props);
        const {
            cards,
            roasterId,
            subscription: { data }
        } = props;
        this.state = {
            cards: this.sortCards(cards),
            roasterId,
            subscription: data,
            errors: {},
            loading: false
        };
    }

    sortCards = cards => {
        return sortBy({ collection: cards, id: "id", sorts: [{ name: "default", desc: true }] });
    };

    setAsDefault = async card_id => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = "/api/v1/roasters/" + roasterId + "/set_as_default";
        const body = { card_id };
        const method = "PUT";

        const respJSON = await requester({ url, body, method });
        this.updateCards(respJSON);
    };

    removeCard = async card_id => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = "/api/v1/roasters/" + roasterId + "/cards";
        const body = { card_id };
        const method = "DELETE";

        const respJSON = await requester({ url, body, method });
        this.updateCards(respJSON);
    };

    handleSubmit = async (token, setAsDefault) => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = "/api/v1/roasters/" + roasterId + "/cards";
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
        const {
            subscription: {
                attributes: {
                    status,
                    sub_items: { data: sub_item_data },
                    next_amount_due,
                    next_bill_date
                }
            },
            cards,
            loading
        } = this.state;
        const { stripeApiKey, roaster } = this.props;

        return (
            <StripeProvider apiKey={stripeApiKey}>
                <div className="form roaster-wizard">
                    <Segment padded>
                        <h2>
                            Subscription Details
                            <Label attached="top right">{status.toUpperCase()}</Label>
                        </h2>
                        <p>
                            <span>Your next charge will be </span>
                            <Money type="positive">{Number(next_amount_due) / 100}</Money>
                            <span> on </span>
                            {moment(next_bill_date).format("MMMM D, YYYY")}
                        </p>
                        <h3>Current subscriptions</h3>
                        <List>
                            {Array.isArray(sub_item_data) &&
                                // TODO The plan details probably need to be added to the Plans table
                                // So they are static-ish
                                sub_item_data.map(item => {
                                    const {
                                        plan: { nickname, amount, interval_count, interval }
                                    } = item;
                                    return (
                                        <List.Item
                                            key={item.id}
                                            header={nickname}
                                            content={`$${amount / 100} / ${interval_count + " " + interval}s`}
                                        />
                                    );
                                })}
                        </List>
                    </Segment>
                    <div>
                        <h2>Manage Payment Methods</h2>
                        <Elements>
                            <CardForm handleSubmit={this.handleSubmit} roaster={roaster} />
                        </Elements>
                    </div>
                    <Divider horizontal>
                        <Header as="h4">
                            <Icon name="credit card outline" />
                            Your cards
                        </Header>
                    </Divider>
                    {this.renderErrors()}
                    <Grid columns={3} stretched style={{ position: "relative" }}>
                        <Dimmer active={loading} inverted>
                            <Loader active={loading} size="large" />
                        </Dimmer>
                        {this.renderCards(cards)}
                    </Grid>
                </div>
            </StripeProvider>
        );
    }
}

const { array, number, object, string } = PropTypes;
App.propTypes = {
    stripeApiKey: string,
    cards: array,
    roasterId: number,
    subscription: object,
    roaster: object
};

export default App;
