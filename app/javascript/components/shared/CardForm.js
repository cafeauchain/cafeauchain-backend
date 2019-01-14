import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Button } from 'semantic-ui-react';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = async ev => {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    this._element.clear()
    this.props.handleSubmit(token)
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement 
            onReady={(element) => this._element = element}
          />
        <Button onClick={this.submit}>Create Card</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);