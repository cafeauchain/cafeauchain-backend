import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import API_URL from "../../utilities/apiUtils/url";

class LotSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lots: [],
            selected: {}
        };
    }
    componentDidMount() {
        const { roasterId } = this.props;
        this.getLots(roasterId);
    }

    buildLot = data => {
        const { attributes, id } = data;
        const { crop_name } = attributes;
        return {
            text: crop_name,
            value: id,
            key: id,
            id,
            name
        };
    };

    getLots = async id => {
        const { parentState } = this.props;
        const url = await `${API_URL}/roasters/${id}/lots`;
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const { data } = responseJson;
            const lots = data.map(this.buildLot);
            this.setState({ lots, selected: {} }, parentState({ lotDetails: { lot_id: "" } }));
        }
    };

    getLot = id => {
        const { lots } = this.state;
        return lots.find(lot => lot.id === id);
    };

    onSelect = (event, { value }) => {
        const { parentState } = this.props;
        const lot = this.getLot(value);
        if (!lot) {
            // eslint-disable-next-line
            console.log("lot wasnt found. It was probably an add. Let the add handle the state update.");
            return;
        }
        this.setState({ selected: lot }, parentState({ lotDetails: { lot_id: lot.id } }));
    };

    render = () => {
        const { lots, selected } = this.state;
        const value = selected ? selected.value : undefined;
        return (
            <Form.Dropdown
                placeholder="Select Lot"
                label="Select Lot"
                fluid
                search
                selection
                deburr
                value={value}
                options={lots}
                onChange={this.onSelect}
            />
        );
    };
}

const { func, oneOfType, number, string } = PropTypes;
LotSelect.propTypes = {
    parentState: func,
    roasterId: oneOfType([number, string])
};

export default LotSelect;
