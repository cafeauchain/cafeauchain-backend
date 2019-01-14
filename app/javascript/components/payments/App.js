import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {Container} from 'semantic-ui-react';
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

  handleSubmit = async token => {
    const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
    let response = await fetch("/api/v1/roasters/" + this.state.roasterId + "/cards", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': cookie
      },
      body: JSON.stringify({token: token.id})
    });

    if (response.ok) {
      let cards = await response.json()
      await console.log("Card token created: ", cards)
      this.setState({cards})
    }
  }

  renderCards = () => {
    const { cards } = this.state
    {cards.forEach(card => {
      return <CardView card={card} />
    })}
  }

  render() {
    return (
      <StripeProvider apiKey={this.props.stripeApiKey}>
        <Container className="form roaster-wizard">
          <div className="example">
            <h1>Manage Subscription</h1>
            <Elements>
              <CardForm handleSubmit={this.handleSubmit} />
            </Elements>
          </div>
          {this.renderCards()}
        </Container>
      </StripeProvider>
    );
  }
}

export default App;