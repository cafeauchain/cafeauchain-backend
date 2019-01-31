import React, { Component, Fragment as F } from "react";
import { Header, Placeholder } from "semantic-ui-react";

// import requester from "../utilities/apiUtils/requester";
import API_URL from "../utilities/apiUtils/url";

class OpenContracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        const { id } = this.props;
        this.getContracts(id);
    }
    buildContract = data => {
        const { attributes, id, relationships } = data;
        const { contract_value, harvest_year, on_hand, pounds_of_coffee, price_per_pound } = attributes;
        const { crop } = relationships;
        const { data: cropData } = crop;
        const { id: crop_id } = cropData;
        return {
            contract_value,
            harvest_year,
            on_hand,
            pounds_of_coffee,
            price_per_pound,
            crop_id,
            id
        };
    };
    getContracts = async id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        let response = await fetch(url);
        if (response.ok) {
            let res = await response.json();
            let data = res.data.map(this.buildContract);
            this.setState({ data });
        }
    };
    render() {
        const { data } = this.state;
        return (
            <F>
                <Header as="h2" content="Open contracts" />
                {data.map(item => (
                    <div key={item.id}>{`${item.id} Crop: ${item.crop_id}; Value: ${item.contract_value}`}</div>
                ))}
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
            </F>
        );
    }
}

export default OpenContracts;
