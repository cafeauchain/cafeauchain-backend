/* eslint-disable */
import React, { Component } from "react";
import { Container, Form, Input, Header, Label, Segment } from "semantic-ui-react";
import ProducerSelect from "../../shared/producers/producerSelect";
import CropSelect from "../../shared/crops/cropSelect";
import readCookie from "../../utilities/readCookie";
import API_URL from "../../utilities/apiUtils/url";

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cropOptions: []
        }
    }

    onSelect = async producerId => {
        // eslint-disable-next-line
        console.log(producerId)
        await this.getCrops(producerId)
    }

    addProducer = async producerName => {
        const url = `${API_URL}/producers`;
        const body = {producer_profile: {name: producerName}}
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
    }

    getCrops = async producerId => {
        const url = `${API_URL}/producers/${producerId}/crops`;
        const { cropOptions } = this.state;
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const crops = responseJson.data;
            crops.map(crop => {
                cropOptions.push({key: crop.id, value: crop.id, text: crop.attributes.name})
            })
            this.setState({ cropOptions });
        }
    };

    render = () => {
        const { cropOptions } = this.state
        const cropYears = [
            {key: "2016", value: "2016", text: "2016"},
            {key: "2017", value: "2017", text: "2017"},
            {key: "2018", value: "2018", text: "2018"},
            {key: "2019", value: "2019", text: "2019"},
        ]
        return(
            <Container style={{ margin: "4em 0" }}>
                <Segment.Group>
                    <Segment>
                        <Header as="h2" content="Add a new crop" />
                    </Segment>
                    <Segment>
                        <Form>
                            <Form.Group widths='equal'>
                                <ProducerSelect onSelect={this.onSelect} />
                                <CropSelect cropOptions={cropOptions} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Input 
                                        fluid 
                                        label='lbs'
                                        labelPosition='right' 
                                        placeholder="Pounds ordered from producer"

                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input 
                                        fluid 
                                        label='lbs'
                                        labelPosition='right'  
                                        placeholder='Pounds on hand'     
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Input 
                                        fluid 
                                        label='lbs'
                                        labelPosition='right'  
                                        placeholder='Pounds roasted (green weight)'     
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input labelPosition='right' type='text' placeholder='Price per pound'>
                                        <Label basic>$</Label>
                                        <input />
                                        <Label>/lb</Label>
                                    </Input>
                                </Form.Field>
                                <Form.Dropdown 
                                    fluid 
                                    selection 
                                    placeholder="Crop harvest year" 
                                    options={cropYears}
                                />
                            </Form.Group>
                        </Form>
                    </Segment>
                </Segment.Group>
            </Container>
        )
    }
}

export default Dashboard;