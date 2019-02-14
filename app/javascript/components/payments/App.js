import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import moment from "moment";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Container, Divider, Grid, Header, Icon, Message, Segment, Label, List } from "semantic-ui-react";

/* eslint-disable */
import { readCookie } from "utilities";
import { url as API_URL, requester, fetcher } from "utilities/apiUtils";

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
        } = this.props;
        this.state = {
            cards,
            roasterId,
            subscription: data,
            errors: {}
        };
    }

    setAsDefault = async (ev, cardId) => {
        ev.preventDefault();
        const { roasterId } = this.state;
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch("/api/v1/roasters/" + roasterId + "/set_as_default", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": cookie
            },
            body: JSON.stringify({ card_id: cardId })
        });

        if (response.ok) {
            let cards = await response.json();
            this.setState({ cards });
        }
    };

    removeCard = async (ev, cardId) => {
        ev.preventDefault();
        const { roasterId } = this.state;
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch("/api/v1/roasters/" + roasterId + "/cards", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": cookie
            },
            body: JSON.stringify({ card_id: cardId })
        });

        if (response.ok) {
            let cards = await response.json();
            this.setState({ cards });
        } else {
            const errors = await response.json();
            await this.setState({ errors });
        }
    };

    handleSubmit = async token => {
        const { roasterId } = this.state;
        const url = "/api/v1/roasters/" + roasterId + "/cards";
        const body = { token: token.id };

        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            console.log("success", respJSON);
            this.setState({ cards: respJSON });
        }
    };

    renderCards = () => {
        const { cards } = this.state;
        return cards.map(card => {
            return (
                <CardView
                    key={shortid.generate()}
                    setAsDefault={this.setAsDefault}
                    removeCard={this.removeCard}
                    card={card}
                />
            );
        });
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
            }
        } = this.state;
        const { stripeApiKey, roaster } = this.props;

        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Container className="form roaster-wizard">
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
                    <Grid columns={3}>{this.renderCards()}</Grid>
                </Container>
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
