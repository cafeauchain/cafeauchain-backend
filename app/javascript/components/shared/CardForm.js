import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Button } from 'semantic-ui-react';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    this.props.handleSubmit(ev)
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);