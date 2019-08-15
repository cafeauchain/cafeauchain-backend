import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Divider, Grid, Header, Icon, Segment, Label, List, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
import { sortBy, callMeDanger } from "utilities";

import ErrorHandler from "shared/errorHandler";
import { Money, AsNumber, PosMoney } from "shared/textFormatters";
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
            errors: [],
            loading: false
        };
    }

    sortCards = cards => {
        return sortBy({ collection: cards, id: "id", sorts: [{ name: "default", desc: true }] });
    };

    setAsDefault = async card_id => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = ROASTER_URL( roasterId ) + "/set_as_default";
        const body = { card_id };

        const respJSON = await requester({ url, body, method: "PUT" });
        this.updateCards(respJSON);
    };

    removeCard = async card_id => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = ROASTER_URL( roasterId ) + "/cards";
        const body = { card_id };

        const respJSON = await requester({ url, body, method: "DELETE" });
        this.updateCards(respJSON);
    };

    handleSubmit = async (token, setAsDefault) => {
        this.setState({ loading: true });
        const { roasterId } = this.state;
        const url = ROASTER_URL( roasterId ) + "/cards";
        const body = { token: token.id, setAsDefault };

        const respJSON = await requester({ url, body });
        this.updateCards(respJSON);
    };

    updateCards = data => {
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
            this.setState({ loading: false, errors: [data.response] });
        } else {
            // eslint-disable-next-line
            console.log("success", data);
            const cards = this.sortCards(data);
            this.setState({ cards, loading: false });
        }
    };

    render() {
        const {
            subscription: {
                attributes: {
                    status,
                    subscription_items,
                    next_amount_due,
                    next_bill_date,
                    amount_roasted_in_cycle: roasted
                }
            },
            cards,
            loading,
            errors
        } = this.state;
        const { stripeApiKey, roaster } = this.props;

        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Segment>
                    <Header as="h2" content="Subscription Details" />
                    <Label attached="top right">{status.toUpperCase()}</Label>
                    <p>
                        <React.Fragment>Your next charge will be </React.Fragment>
                        <Money type="positive">{Number(next_amount_due) / 100}</Money>
                        <React.Fragment> on </React.Fragment>
                        {moment(next_bill_date).format("MMMM D, YYYY")}
                    </p>
                    <h3>Current subscriptions</h3>
                    <List>
                        {subscription_items.map(item => (
                            <List.Item
                                key={item.id}
                                header={item.title}
                                content={item.description}
                            />
                        ))}
                    </List>
                    {roasted > 500 && (
                        <p>
                            {callMeDanger("To date, you've roasted ")}
                            <strong>
                                <AsNumber type="positive" content={roasted} />
                            </strong>
                            <React.Fragment> lbs this month. The usage portion of your bill is </React.Fragment>
                            <strong>
                                <PosMoney content={Math.ceil((roasted - 500) / 500) * 10} />
                            </strong>
                        </p>
                    )}
                    <Divider horizontal />
                    <Header as="h2" content="Manage Payment Methods" />
                    <Elements>
                        <CardForm handleSubmit={this.handleSubmit} name={roaster.name} />
                    </Elements>
                    {cards.length > 0 && (
                        <React.Fragment>
                            <Divider horizontal>
                                <Header as="h4">
                                    <Icon name="credit card outline" />
                                    Your cards
                                </Header>
                            </Divider>
                            {errors.length > 0 && <ErrorHandler errors={errors} />}
                            <Grid columns={3} stretched style={{ position: "relative" }}>
                                <Dimmer active={loading} inverted>
                                    <Loader active={loading} size="large" />
                                </Dimmer>
                                {cards.map(card => (
                                    <CardView
                                        key={card.id}
                                        setAsDefault={this.setAsDefault}
                                        removeCard={this.removeCard}
                                        card={card}
                                    />
                                ))}
                            </Grid>
                        </React.Fragment>
                    )}
                </Segment>
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
