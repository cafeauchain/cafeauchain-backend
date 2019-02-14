import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Modal from "shared/modal";

import AdditionalDetails from "payments/additionalCardDetails";
/* eslint-disable */

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBtn: false
        };
    }

    submitCC = async ({ details }) => {
        const { stripe, handleSubmit } = this.props;
        let { token } = await stripe.createToken({ name: details.name });
        if (!token) {
            console.log("there was a problem creating a token");
            return;
        } else if (token.error) {
            console.log("the token was created but there was an error");
            return;
        }
        this._element.clear();
        handleSubmit(token, details.setAsDefault);
    };

    validateCC = () => {
        this.setState({ showBtn: !this._element._invalid });
    };

    render() {
        const {
            roaster: { name: roasterName }
        } = this.props;
        const { showBtn } = this.state;
        return (
            <div className="checkout">
                <Segment>
                    <p>Add a new card:</p>
                    <CardElement
                        onReady={element => (this._element = element)}
                        onChange={this.validateCC}
                        onBlur={this.validateCC}
                    />
                    <Modal
                        text="Add Card"
                        showBtn={showBtn}
                        title="Additional Card Details"
                        component={<AdditionalDetails name={roasterName} submitCC={this.submitCC} />}
                    />
                </Segment>
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
