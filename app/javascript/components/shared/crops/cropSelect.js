import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import API_URL from "../../utilities/apiUtils/url";
import requester from "../../utilities/apiUtils/requester";

class CropSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crops: [],
            selected: {}
        };
    }
    componentDidMount() {
        const { producerId } = this.props;
        if (producerId !== undefined) {
            this.getCrops(producerId);
        } else {
            this.getCrops()
        }
    }

    shouldComponentUpdate(nextProps) {
        const { producerId } = this.props;
        const { producerId: id } = nextProps;
        if (producerId !== undefined && id !== producerId) {
            this.getCrops(id);
        } 
        return true;
    }

    buildCrop = data => {
        const { attributes, id } = data;
        const { name } = attributes;
        return {
            text: name,
            value: id,
            key: id,
            id,
            name
        };
    };

    getCrops = async id => {
        const { parentState, roasterId } = this.props;
        let url = ""
        if (id !== undefined ) {
            url = await `${API_URL}/producers/${id}/crops`;
        } else {
            url = await `${API_URL}/roasters/${roasterId}/crops`;
        }
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const { data } = responseJson;
            const crops = data.map(this.buildCrop);
            if (parentState !== undefined) {
                this.setState({ crops, data, selected: {} }, parentState({ lotDetails: { crop_id: "" } }));
            } else {
                this.setState({ crops, selected: {} });
            }
        }
    };

    addCrop = async (event, { value }) => {
        const { parentState, producerId } = this.props;
        let { crops } = this.state;
        crops = [...crops];
        const url = `${API_URL}/producers/${producerId}/crops`;
        const body = { crop_name: value };
        const responseJson = await requester({ url, body });
        if (responseJson instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error");
        } else {
            const { data } = responseJson;
            const crop = this.buildCrop(data);
            crops = [crop, ...crops];
            this.setState({ crops, selected: crop }, parentState({ lotDetails: { crop_id: crop.id } }));
        }
    };

    getCrop = id => {
        const { crops } = this.state;
        return crops.find(crop => crop.id === id);
    };

    onSelect = (event, { value }) => {
        const { parentState } = this.props;
        const crop = this.getCrop(value);
        if (!crop) {
            // eslint-disable-next-line
            console.log("crop wasnt found. It was probably an add. Let the add handle the state update.");
            return;
        }

        if (parentState !== undefined) {
            this.setState({ selected: crop }, parentState({ lotDetails: { crop_id: crop.id } }));
        } else {
            this.setState({ selected: crop })
        }
    };

    render = () => {
        const { crops, selected } = this.state;
        const value = selected ? selected.value : undefined;
        return (
            <Form.Dropdown
                placeholder="Select Crop"
                fluid
                search
                selection
                deburr
                allowAdditions
                value={value}
                options={crops}
                onChange={this.onSelect}
                onAddItem={this.addCrop}
            />
        );
    };
}

const { func, oneOfType, number, string } = PropTypes;
CropSelect.propTypes = {
    producerId: oneOfType([number, string]),
    parentState: func,
    roasterId: oneOfType([number, string])
};

export default CropSelect;
