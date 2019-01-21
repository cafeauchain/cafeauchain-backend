import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Button } from 'semantic-ui-react';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit = async ev => {
        ev.preventDefault()
        const { stripe, handleSubmit } = this.props
        let {token} = await stripe.createToken({name: "Name"});
        this._element.clear()
        handleSubmit(token)
    }

    render() {
        return (
            <div className="checkout">
                <p>Add a new card:</p>
                <CardElement 
                    onReady={(element) => this._element = element}
                />
                <Button onClick={this.submit}>Create Card</Button>
            </div>
        );
    }
}

const { func, object } = PropTypes;
CheckoutForm.propTypes = {
    stripe: object,
    handleSubmit: func
};

export default injectStripe(CheckoutForm);