import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Divider } from "semantic-ui-react";

import ProducerSelect from "../../shared/producers/producerSelect";
import CropSelect from "../../shared/crops/cropSelect";

import API_URL from "../../utilities/apiUtils/url";
import requester from "../../utilities/apiUtils/requester";

// TODO can 'on_hand' and 'roasted' be defaulted to 0? or removed? or in some way opted in?
// Since the only time they should be used is when onboarding
// Possibly a prop to omit/hide/defualt to 0 when added from quick actions?

const fields = [
    { name: "lot_size", label: "lbs", placeholder: "Pounds ordered from producer" },
    { name: "on_hand", label: "lbs", placeholder: "Pounds on hand" },
    { name: "roasted", label: "lbs", placeholder: "Pounds roasted (green weight)" },
    { name: "price_per_pound", label: "/lb", placeholder: "Price per pound", icon: "dollar" }
];

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
            window.location.href = await respJSON.redirect_url;
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

const { oneOfType, string, number } = PropTypes;
SingleContract.propTypes = {
    id: oneOfType([number, string])
};

export default SingleContract;
