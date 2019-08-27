import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import Modal from "shared/modal";
import { Money } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";

import ShippingOptions from "shop/shipping/options";

import { humanize, pluralize } from "utilities";
import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Shipping extends React.Component {
    state = {
        errors: [],
        loading: true,
        shipping_rates: []
    }
    componentDidMount() {
        this.fetchShipping();
    }

    async componentDidUpdate(props){
        const { fetchRates } = props;
        const { fetchRates: newRates } = this.props;
        if( fetchRates && newRates ){
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ loading: true }, this.getShipping() );
        }
    }
    getShipping = () => {
        const { updateContext } = this.props;
        updateContext({ fetchRates: false });
        this.fetchShipping();
    }

    fetchShipping = async () => {
        console.log('fetching rates');
        const { updateContext, cart_id, wholesale_id, shipping } = this.props;
        const url = API_URL + "/get_rates?cart_id=" + cart_id + "&wholesale_profile_id=" + wholesale_id;
        const response = await requester({ url, method: 'GET' });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, loading: false });
        } else {
            let rate; 
            if( shipping ){
                rate = response.find(({service}) => service === shipping.service);
            } else {
                const shippingIndex = response.findIndex(({ service }) => {
                    return (service === "FEDEX_GROUND") || (service === "Ground") || (service === "Priority");
                });
                const defaultIdx = shippingIndex > -1 ? shippingIndex : 0;
                rate = response[defaultIdx];
            }
            
            this.setState({
                loading: false,
                shipping_rates: response
            }, updateContext({ shipping: rate }));
        }
    }

    updateCart = obj => {
        const { shipping_rates } = this.state;
        const { updateContext } = this.props;
        updateContext({ shipping: shipping_rates[obj.shippingIdx] });

    }
    render(){
        let { shipping } = this.props;
        const { errors, loading, shipping_rates = [] } = this.state;
        if( !shipping ){
            shipping = {
                service: "Fetching",
                retail_rate: 0
            };
        }

        const speed = Number(shipping.est_delivery_days);
        const speedString = speed ? pluralize(speed, ' day') : "Unknown";

        return (
            <div style={{ position: "relative" }}>
                <Dimmer inverted active={loading}>
                    <Loader size="small" />
                </Dimmer>
                <p><strong>Shipping</strong></p>
                {errors.length > 0 && <ErrorHandler errors={errors} />}
                <Flex spacebetween spacing="10">
                    <span>Service: </span>
                    <span>
                        {humanize(shipping.service, true)}
                    </span>
                </Flex>
                <Flex spacebetween spacing="10">
                    <span>Shipping Estimate: </span>
                    <span>
                        {speedString}
                    </span>
                </Flex>
                <Flex spacebetween spacing="10">
                    <span>Price: </span>
                    <span>
                        <Money>{shipping.retail_rate}</Money>
                    </span>
                </Flex>
                <Modal
                    text="Edit"
                    title="Choose Shipping Options"
                    unstyled
                    className="link"
                    component={(
                        <ShippingOptions
                            rates={shipping_rates}
                            updateCartDetails={this.updateCart}
                            current={shipping}
                        />
                    )}
                />
            </div>
        );
    }
}
const { func, object, number, string, oneOfType, bool } = PropTypes;
Shipping.propTypes = {
    updateContext: func,
    cart_id: oneOfType([number, string]),
    wholesale_id: oneOfType([number,string ]),
    shipping: object,
    fetchRates: bool
};

export default withContext(Shipping);