import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import LotSelect from "shared/lots/lotSelect";

import Input from "shared/input";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <AcceptDelivery
                {...props}
                id={ctx.userId}
                updateContext={ctx.updateContext}
                lots={ctx.lots}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class AcceptDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotDetails: {}
        };
    }
    componentDidMount() {
        const { lots, getCtxData } = this.props;
        if (lots === undefined) {
            getCtxData("lots");
        }
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
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                this.getLotData(id);
            }
        }
    };

    // only called after successful submit
    getLotData = async id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        const { updateContext, closeModal } = this.props;
        const response = await fetch(url);
        const { data } = await response.json();
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
        } else {
            // TODO Add success/error messaging before closing
            await updateContext({ lots: data });
            closeModal();
        }
    };

    buildLotOptions = lots =>
        lots.map(({ id, attributes: { name } }) => ({ value: id, text: name, key: id, id, name }));

    render() {
        let { lots } = this.props;
        if (lots === undefined) lots = [];
        const lotOptions = this.buildLotOptions(lots);
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    inputType="select"
                    options={lotOptions}
                    onChange={this.handleInputChange}
                    name="lot_id"
                    label="Choose Lot"
                />
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

const { oneOfType, string, number, func, array } = PropTypes;
AcceptDelivery.propTypes = {
    id: oneOfType([number, string]),
    closeModal: func,
    updateContext: func,
    lots: array,
    getCtxData: func
};

export default Wrapper;
