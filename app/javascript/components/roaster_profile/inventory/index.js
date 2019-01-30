import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Grid, Input, Header, Label, Placeholder, Segment } from "semantic-ui-react";

import AddLots from "./addLots";

import ProducerSelect from "../../shared/producers/producerSelect";
import CropSelect from "../../shared/crops/cropSelect";

import readCookie from "../../utilities/readCookie";
import API_URL from "../../utilities/apiUtils/url";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropOptions: [],
            lotDetails: {
                crop_id: null,
                roaster_profile_id: props.roaster_profile_id
            }
        };
    }

    onSelect = async producerId => {
        // eslint-disable-next-line
        this.setState({producerId})
        await this.getCrops(producerId)
    }

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
        const { roaster_profile_id } = this.props;
        const url = `${API_URL}/roasters/${roaster_profile_id}/lots`;
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": cookie
            },
            body: JSON.stringify(lotDetails)
        });
        let respJSON = await response.json();
        if (response.ok) {
            window.location.href = await respJSON.redirect_url;
        } else {
            // eslint-disable-next-line
            this.setState({ error: respJSON.error });
        }
    };

    addProducer = async producerName => {
        const url = `${API_URL}/producers`;
        const body = { producer_profile: { name: producerName } };
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        // eslint-disable-next-line
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        let responseJson = await response.json();
        if (response.ok) {
            const producerId = responseJson.slug
            this.setState({producerId})
        }
    }

    addCrop = async cropName => {
        const { producerId } = this.state
        const url = `${API_URL}/producers/${producerId}/crops`;
        const body = {crop_name: cropName}
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        let responseJson = await response.json();
        if (response.ok) {
            const cropId = responseJson.id
            let { lotDetails } = this.state;
            lotDetails = { ...lotDetails };
            lotDetails["crop_id"] = cropId;
            this.setState({lotDetails})
        }
    }

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

    render = () => {
        const { cropOptions } = this.state;
        const { roaster_profile_id: id } = this.props;
        const cropYears = [
            { key: "2016", value: "2016", text: "2016" },
            { key: "2017", value: "2017", text: "2017" },
            { key: "2018", value: "2018", text: "2018" },
            { key: "2019", value: "2019", text: "2019" }
        ];
        return (
            <Container style={{ margin: "4em 0" }}>
                <Grid>
                    <Grid.Column width={10}>
                        <Segment>
                            <Header as="h2" content="Open contracts" />
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                            <Header as="h2" content="Recent Transactions" />
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <AddLots id={id} />
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
                    </Grid.Column>
                </Grid>
            </Container>
        );
    };
}

const { oneOfType, number, string } = PropTypes;
Dashboard.propTypes = {
    roaster_profile_id: oneOfType([number, string])
};
export default Dashboard;
