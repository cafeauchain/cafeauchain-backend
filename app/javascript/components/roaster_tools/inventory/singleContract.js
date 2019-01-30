import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Label, Segment, Header } from "semantic-ui-react";

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

    render() {
        const cropOptions = [{ value: "temp", key: "temp", text: "Temp" }];
        const cropYears = [
            { key: "2016", value: "2016", text: "2016" },
            { key: "2017", value: "2017", text: "2017" },
            { key: "2018", value: "2018", text: "2018" },
            { key: "2019", value: "2019", text: "2019" }
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
                        <Form.Field>
                            <Input
                                name="lot_size"
                                fluid
                                label="lbs"
                                labelPosition="right"
                                placeholder="Pounds ordered from producer"
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                name="on_hand"
                                fluid
                                label="lbs"
                                labelPosition="right"
                                placeholder="Pounds on hand"
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                name="roasted"
                                fluid
                                label="lbs"
                                labelPosition="right"
                                placeholder="Pounds roasted (green weight)"
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                name="price_per_pound"
                                labelPosition="right"
                                type="text"
                                placeholder="Price per pound"
                                onChange={this.handleInputChange}
                            >
                                <Label basic>$</Label>
                                <input />
                                <Label>/lb</Label>
                            </Input>
                        </Form.Field>
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
