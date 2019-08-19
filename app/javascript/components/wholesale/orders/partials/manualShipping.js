import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader, Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class ManualShipping extends React.Component {
    constructor(props){
        super(props);
        const { shipping_method: { service, carrier, final_rate } } = props;
        this.state = {
            loading: false,
            errors: [],
            details: {
                service,
                carrier,
                retail_rate: final_rate
            }
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ loading: true });
        const { userId, shipping_method } = this.props;
        const { details } = this.state;
        const url = ROASTER_URL(userId) + "/shipping_methods/" + shipping_method.id;
        const body = {...details};
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        const { order_id, updateContext, successClose, closeModal } = this.props;
        const url = API_URL + '/orders/' + order_id;

        if (response instanceof Error) {
            this.setState({ errors: response.response.data, loading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                const order = await requester({ url, method: 'GET' });
                const success = "Shipping Updated!";
                await updateContext({ order: order.data });
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    closeModal();
                }
            }
        }
    }
    render() {
        const { loading, errors, details: { service, carrier, retail_rate } } = this.state;
        return (
            <React.Fragment>
                <Dimmer active={loading} inverted>
                    <Loader active={loading} size="large" />
                </Dimmer>
                {errors.length > 0 && <ErrorHandler errors={errors} />}
                <Form>
                    <Input 
                        name="carrier"
                        label="Carrier"
                        onChange={this.handleInputChange}
                        value={carrier}
                    />
                    <Input
                        name="service"
                        label="Service"
                        onChange={this.handleInputChange}
                        value={service}
                    />
                    <Input
                        name="retail_rate"
                        label="Rate"
                        onChange={this.handleInputChange}
                        value={retail_rate}
                    />
                    <Button primary content="Submit" onClick={this.handleSubmit} />
                </Form>
            </React.Fragment>

        );
    }
}

const { string, number, oneOfType, object, func } = PropTypes;
ManualShipping.propTypes = {
    order_id: oneOfType([string, number]),
    userId: oneOfType([string, number]),
    shipping_method: object,
    successClose: func,
    closeModal: func,
    updateContext: func
};

export default withContext(ManualShipping);