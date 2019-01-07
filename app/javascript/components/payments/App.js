import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CardForm from '../shared/CardForm';

class App extends Component {

  handleSubmit = event => {
    console.log("Submit clicked: ", event)
  }
  render() {
    return (
      <StripeProvider apiKey={this.props.stripeApiKey}>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CardForm handleSubmit={this.handleSubmit} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;