import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {Container, Divider, Grid, Header, Icon} from 'semantic-ui-react';
import readCookie from '../utilities/readCookie';
import CardForm from '../shared/CardForm';
import CardView from './CardView';

class App extends Component {

    constructor(props) {
        super(props)
        let { cards, roasterId } = this.props
        this.state = {
            cards,
            roasterId
        }
    }

    setAsDefault = async (ev, cardId) =>{
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
            return <CardView key={shortid.generate()} setAsDefault={this.setAsDefault} card={card} />
        })
    }

    render() {
        const { stripeApiKey } = this.props
        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Container className="form roaster-wizard">
                    <div className="example">
                        <h1>Manage Subscription</h1>
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
                    <Grid columns={3}>
                        {this.renderCards()}
                    </Grid>
                </Container>
            </StripeProvider>
        );
    }
}

const { array, number, string } = PropTypes;
App.propTypes = {
    stripeApiKey: string,
    cards: array,
    roasterId: number
};

export default App;