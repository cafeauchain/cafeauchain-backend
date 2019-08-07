import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import ShippingOptions from "shop/shipping/options";
import { url as API_URL, roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class EditShipping extends React.Component {
    state = {
        rates: [],
        current: {}
    }
    async componentDidMount(){
        const { order_id, wholesale_profile_id } = this.props;
        let params = `?order_id=${order_id}&wholesale_profile_id=${wholesale_profile_id}`;
        const response = await requester({ url: API_URL + "/get_rates" + params , method: "GET" });
        this.setState({ rates: response });
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
        await requester({ url, body, method: 'PUT' });
        this.afterSubmit();
    }
    afterSubmit = async () => {
        const { order_id, updateContext } = this.props;
        const url = API_URL + '/orders/' + order_id;
        const order = await requester({ url, method: 'GET' });
        updateContext({order: order.data});
    }
    render(){
        const { successClose, closeModal } = this.props;
        const { rates, current } = this.state;
        return (
            <React.Fragment>
                <div>This is how to edit shipping</div>
                <ShippingOptions
                    rates={rates}
                    updateCartDetails={this.updateCartDetails}
                    current={current}
                    // TODO not sure why I need to explictly pass these in
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