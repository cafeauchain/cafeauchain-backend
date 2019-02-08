import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import LotSelect from "shared/lots/lotSelect";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

class AcceptDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotDetails: {}
        };
    }

    parentState = obj => {
        this.setState(obj);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        const { lotDetails } = this.state;
        const lotId = lotDetails.lot_id;
        const { id } = this.props;
        const url = `${API_URL}/roasters/${id}/lots/${lotId}`;
        const method = "PUT";
        lotDetails["accept_delivery"] = true;
        let body = { lotDetails };
        let respJSON = await requester({ url, body, method });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            window.location.href = await respJSON.redirect_url;
        }
    };

    render() {
        const { id } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <LotSelect roasterId={id} parentState={this.parentState} fluid />
                <Form.Input
                    name="quantity"
                    fluid
                    placeholder="Amount delivered (in lbs)"
                    label="Amount Delivered (in lbs)"
                    onChange={this.handleInputChange}
                />
                <Button size="small" primary fluid>
                    Accept Delivery
                </Button>
            </Form>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
AcceptDelivery.propTypes = {
    id: oneOfType([number, string])
};

export default AcceptDelivery;
