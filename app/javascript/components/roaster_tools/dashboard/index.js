import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, Placeholder, Segment } from "semantic-ui-react";

import SingleContract from "../inventory/singleContract"

import readCookie from "../../utilities/readCookie";
import API_URL from "../../utilities/apiUtils/url";
import AcceptDelivery from "../inventory/acceptDelivery";

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
            const producerId = responseJson.slug;
            this.setState({ producerId });
        }
    };

    addCrop = async cropName => {
        const { producerId } = this.state;
        const url = `${API_URL}/producers/${producerId}/crops`;
        const body = { crop_name: cropName };
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

    render = () => {
        // const { cropOptions } = this.state;
        const { roaster_profile_id: id } = this.props;
        // const cropYears = [
        //     { key: "2016", value: "2016", text: "2016" },
        //     { key: "2017", value: "2017", text: "2017" },
        //     { key: "2018", value: "2018", text: "2018" },
        //     { key: "2019", value: "2019", text: "2019" }
        // ];
        return (
            <Container style={{ margin: "4em 0" }}>
                <Segment>
                    <Header as="h1" content="Dashboard" />
                </Segment>
                <Grid>
                    <Grid.Column width={10}>
                        <AcceptDelivery roasterId={id} />
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
                        <SingleContract id={id} />
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
