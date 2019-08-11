import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const carriers = [
    { id: "usps", text: "USPS", value: "USPS" },
    { id: "fedex", text: "FedEx", value: "FedEx" },
    { id: "ups", text: "UPS", value: "UPS" }
];

class Tracking extends React.Component {
    constructor(props){
        super(props);
        const { attributes: { order_shipping_method: { carrier, tracking_number } } } = props.order;
        this.state = {
            btnLoading: false,
            details: {
                tracking_number: tracking_number,
                carrier: carrier
            },
            errors: []
        };
    }
    handleInputChange = (e, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };
    handleUpdate = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { details } = this.state;
        const { order: { attributes: { order_shipping_method: { id } } } } = this.props;
        const url = API_URL + "/order_shipping_methods/" + id;
        const body = { ...details };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    }
    afterSubmit = response => {
        setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: response.response });
            } else {
                const { closeModal, successClose, updateContext, order: { id } } = this.props;
                const success = "Tracking Number Updated!";
                const order = await requester({ url: API_URL + "/orders/" + id, method: "GET" });
                await updateContext({ order: order.data });
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    setTimeout(closeModal, 400);
                }
            }
        }, 400);
    }
    render() {
        const { details, btnLoading, errors } = this.state;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Input 
                    onChange={this.handleInputChange}
                    name="tracking_number"
                    label="Tracking Number"
                    value={details.tracking_number}
                />
                <Input
                    onChange={this.handleInputChange}
                    inputType="select"
                    name="carrier"
                    label="Carrier"
                    value={details.carrier}
                    options={carriers}
                />
                <Button onClick={this.handleUpdate} content="Add Tracking Number" primary loading={btnLoading} />
            </Form>
        );
    }
}

const { object, oneOfType, number, string, func } = PropTypes;
Tracking.propTypes = {
    order: object,
    order_id: oneOfType([number, string]),
    closeModal: func,
    successClose: func,
    updateContext: func,
};

export default withContext(Tracking);
