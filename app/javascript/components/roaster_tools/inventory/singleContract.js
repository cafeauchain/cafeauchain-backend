import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Segment, Header } from "semantic-ui-react";

import ProducerSelect from "../../shared/producers/producerSelect";
import CropSelect from "../../shared/crops/cropSelect";

import API_URL from "../../utilities/apiUtils/url";
import requester from "../../utilities/apiUtils/requester";

class SingleContract extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSelect = async producerId => {
        // eslint-disable-next-line
        this.setState({ producerId });
        await this.getCrops(producerId);
    };

    selectCrop = async cropId => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        lotDetails["crop_id"] = cropId;
        this.setState({ lotDetails });
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

    addProducer = async producerName => {
        const url = `${API_URL}/producers`;
        const body = { producer_profile: { name: producerName } };
        const responseJson = await requester({ url, body });
        if (responseJson instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error");
        } else {
            const producerId = responseJson.slug;
            this.setState({ producerId });
        }
    };

    addCrop = async cropName => {
        const { producerId } = this.state;
        const url = `${API_URL}/producers/${producerId}/crops`;
        const body = { crop_name: cropName };
        let responseJson = await requester({ url, body });
        if (responseJson instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error");
        } else {
            const cropId = responseJson.id;
            let { lotDetails } = this.state;
            lotDetails = { ...lotDetails };
            lotDetails["crop_id"] = cropId;
            this.setState({ lotDetails });
        }
    };

    getCrops = async producerId => {
        const url = await `${API_URL}/producers/${producerId}/crops`;
        const { cropOptions } = this.state;
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const crops = responseJson.data;
            crops.map(crop => {
                cropOptions.push({ key: crop.id, value: crop.id, text: crop.attributes.name });
            });
            this.setState({ cropOptions });
        }
    };
    getYears = num => {
        const start = new Date().getFullYear();
        const arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(start - i);
        }
        return arr;
    };

    render() {
        const cropOptions = [{ value: "temp", key: "temp", text: "Temp" }];
        const cropYears = this.getYears(4).map(x => ({ value: x, text: x, key: x }));

        const fields = [
            { name: "lot_size", label: "lbs", placeholder: "Pounds ordered from producer" },
            { name: "on_hand", label: "lbs", placeholder: "Pounds on hand" },
            { name: "roasted", label: "lbs", placeholder: "Pounds roasted (green weight)" },
            { name: "price_per_pound", label: "/lb", placeholder: "Price per pound", icon: "dollar" }
        ];
        return (
            <Segment.Group>
                <Segment>
                    <Header as="h2" content="Add a new contract" />
                </Segment>
                <Segment>
                    <Form onSubmit={this.handleSubmit}>
                        <ProducerSelect onSelect={this.onSelect} />
                        <CropSelect cropOptions={cropOptions} onSelect={this.selectCrop} />
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
                        <Form.Dropdown
                            name="harvest_year"
                            fluid
                            selection
                            placeholder="Crop harvest year"
                            options={cropYears}
                            onChange={this.handleInputChange}
                        />

                        <Button fluid size="large" primary>
                            Update Inventory
                        </Button>
                    </Form>
                </Segment>
            </Segment.Group>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
SingleContract.propTypes = {
    id: oneOfType([number, string])
};

export default SingleContract;
