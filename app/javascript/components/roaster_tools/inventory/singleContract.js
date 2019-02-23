import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Divider } from "semantic-ui-react";

/* eslint-disable */
import ProducerSelect from "shared/producers/producerSelect";
import CropSelect from "shared/crops/cropSelect";

import fields from "defs/forms/addSingleContract";

import { url as API_URL, requester } from "utilities/apiUtils";

import Context from "contextsv2/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>{ctx => <SingleContract {...props} id={ctx.userId} updateContext={ctx.updateContext} />}</Context>
);

class SingleContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producerId: "",
            lotDetails: {}
        };
        this.cropYears = this.getYears(4);
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
        const { id } = this.props;
        const url = `${API_URL}/roasters/${id}/lots`;
        let body = { lotDetails };
        let respJSON = await requester({ url, body });
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

    getYears = num => {
        const start = new Date().getFullYear();
        const arr = [];
        for (let i = 0; i < num; i++) {
            const val = start - i;
            const options = { value: val + "", text: val, key: val };
            arr.push(options);
        }
        return arr;
    };

    render() {
        const { producerId, lotDetails } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <ProducerSelect parentState={this.parentState} />
                {producerId && (
                    <F>
                        <CropSelect producerId={producerId} parentState={this.parentState} />
                        {lotDetails.crop_id && (
                            <Form.Dropdown
                                name="harvest_year"
                                fluid
                                selection
                                placeholder="Crop harvest year"
                                options={this.cropYears}
                                onChange={this.handleInputChange}
                            />
                        )}
                        <Divider />
                        {lotDetails.harvest_year && (
                            <F>
                                {fields.map(field => (
                                    <Form.Field key={field.name}>
                                        <Input
                                            name={field.name}
                                            icon={field.icon}
                                            iconPosition={field.icon ? "left" : undefined}
                                            fluid
                                            label={field.label}
                                            labelPosition="right"
                                            placeholder={field.placeholder}
                                            onChange={this.handleInputChange}
                                            defaultValue={field.defaultValue}
                                        />
                                    </Form.Field>
                                ))}
                                <Button fluid size="large" primary>
                                    Add Contract
                                </Button>
                            </F>
                        )}
                    </F>
                )}
            </Form>
        );
    }
}

const { oneOfType, string, number, func } = PropTypes;
SingleContract.propTypes = {
    id: oneOfType([number, string]),
    updateContext: func,
    closeModal: func
};

export default Wrapper;
