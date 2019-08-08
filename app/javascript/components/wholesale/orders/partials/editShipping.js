import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import ShippingOptions from "shop/shipping/options";

import ErrorHandler from "shared/errorHandler";

import { url as API_URL, roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class EditShipping extends React.Component {
    state = {
        rates: [],
        current: {},
        loading: true,
        errors: []
    }
    async componentDidMount(){
        const { order_id, wholesale_profile_id, shipping_method } = this.props;
        let params = `?order_id=${order_id}&wholesale_profile_id=${wholesale_profile_id}`;
        const response = await requester({ url: API_URL + "/get_rates" + params , method: "GET" });
        const current = response.find( ({carrier, service}) => 
            (carrier === shipping_method.carrier && service === shipping_method.service)
        );
        this.setState({ rates: response, current, loading: false });
    }
    updateCartDetails = obj => {
        const { rates } = this.state;
        const selected = rates[obj.shippingIdx];
        this.updateShipping(selected);
    }
    updateShipping = async selected => {
        const { userId, shipping_method } = this.props;
        const url = ROASTER_URL(userId) + "/shipping_methods/" +  shipping_method.id;
        const body = {
            service: selected.service,
            retail_rate: selected.retail_rate,
            carrier: selected.carrier
        };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        const { order_id, updateContext } = this.props;
        const url = API_URL + '/orders/' + order_id;

        if (response instanceof Error) {
            this.setState({ errors: response.response.data });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                const order = await requester({ url, method: 'GET' });
                updateContext({ order: order.data });
            }
        }        
    }
    render(){
        const { successClose, closeModal } = this.props;
        const { rates, current, loading, errors } = this.state;
        return (
            <React.Fragment>
                <Dimmer active={loading} inverted>
                    <Loader active={loading} size="large" />
                </Dimmer>
                {errors.length > 0 && <ErrorHandler errors={errors} />}
                <ShippingOptions
                    rates={rates}
                    updateCartDetails={this.updateCartDetails}
                    current={current}
                    closeModal={closeModal}
                    successClose={successClose}
                />
            </React.Fragment>
            
        );
    }
}

const { string, number, oneOfType, object, func } = PropTypes;
EditShipping.propTypes = {
    order_id: oneOfType([string,number]),
    wholesale_profile_id: oneOfType([string, number]),
    userId: oneOfType([string, number]),
    shipping_method: object,
    successClose: func,
    closeModal: func,
    updateContext: func
};

export default withContext(EditShipping);