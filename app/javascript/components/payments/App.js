import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {Container, Divider, Grid, Header, Icon, Message, Segment, Label, Comment, List} from 'semantic-ui-react';
import readCookie from '../utilities/readCookie';
import CardForm from '../shared/CardForm';
import CardView from './CardView';

class App extends Component {

    constructor(props) {
        super(props)
        let { cards, roasterId, subscription } = this.props
        this.state = {
            cards,
            roasterId,
            subscription,
            errors: {}
        }
    }

    componentDidMount = async () => {
        const { subscription } = this.props
        let response = await fetch('/api/v1/subscriptions/' + subscription.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            let subscription = await response.json()
            this.setState({subscription})
        }
    }

    setAsDefault = async (ev, cardId) => {
        ev.preventDefault()
        const { roasterId } = this.state
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch("/api/v1/roasters/" + roasterId + "/set_as_default", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': cookie
            },
            body: JSON.stringify({card_id: cardId})
        });

        if (response.ok) {
            let cards = await response.json()
            this.setState({cards})
        }
    }

    removeCard = async (ev, cardId) => {
        ev.preventDefault()
        const { roasterId } = this.state
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch("/api/v1/roasters/" + roasterId + "/cards", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': cookie
            },
            body: JSON.stringify({card_id: cardId})
        });

        if (response.ok) {
            let cards = await response.json()
            this.setState({cards})
        } else {
            const errors = await response.json()
            await this.setState({errors})
        }

    }

    handleSubmit = async token => {
        const { roasterId } = this.state
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch("/api/v1/roasters/" + roasterId + "/cards", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': cookie
            },
            body: JSON.stringify({token: token.id})
        });

        if (response.ok) {
            let cards = await response.json()
            this.setState({cards})
        }
    }

    renderCards = () => {
        const { cards } = this.state
        return cards.map(card => {
            return(
                <CardView 
                    key={shortid.generate()} 
                    setAsDefault={this.setAsDefault} 
                    removeCard={this.removeCard} 
                    card={card} 
                />
            )
        })
    }

    renderErrors = () => {
        const { errors } = this.state
        if (Object.keys(errors).length > 0) {
            const errorMessages = []
            const keys = Object.keys(errors)
            keys.forEach(key => {
                errorMessages.push(errors[key])
            })
            return (
                <Message warning visible>
                    <Message.Header>There was an issue:</Message.Header>
                    <Message.List items={errorMessages} />
                </Message>
            )
        }
    }

    render() {
        const { subscription } = this.state
        const { stripeApiKey } = this.props
        const trialEnd = moment(subscription.trial_end).format("dddd, MMM Do YYYY")
        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Container className="form roaster-wizard">
                    <Segment padded>
                        <h2>
                            Subscription Details
                            <Label attached="top right">{subscription.status.toUpperCase()}</Label>
                        </h2>
                        {subscription.status == "trial" ?
                            <Comment.Metadata content={"Your trial ends: " + trialEnd} />
                            : null
                        }
                        <p>
                            Your next charge will be:&nbsp;
                            $
                            {subscription.next_charge}
                        </p>
                        <h3>Current subscriptions</h3>
                        <List>
                            {subscription.subscription_items !== undefined ? 
                                subscription.subscription_items.map(si => {
                                    return(
                                        <List.Item 
                                            key={shortid.generate()} 
                                            header={si.plan_name} 
                                            content={"$" + (si.plan_price / 100) + "/" + si.interval} 
                                        />
                                    )
                                }) : null
                            }
                        </List>
                    </Segment>
                    <div className="example">
                        <h2>Manage Payment Methods</h2>
                        <Elements>
                            <CardForm handleSubmit={this.handleSubmit} />
                        </Elements>
                    </div>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='credit card outline' />
                            Your cards
                        </Header>
                    </Divider>
                    {this.renderErrors()}
                    <Grid columns={3}>
                        {this.renderCards()}
                    </Grid>
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
    subscription: object
};

export default App;