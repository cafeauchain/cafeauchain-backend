import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => <Lots>{lots => <LotSelect {...props} lots={lots.data} />}</Lots>;

class LotSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lots: [],
            selected: {}
        };
    }
    componentDidMount() {
        const { lots } = this.props;
        this.getLots(lots);
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

    getLots = data => {
        const { parentState } = this.props;
        const lots = data.map(this.buildLot);
        this.setState({ lots, selected: {} }, parentState({ lotDetails: { lot_id: "" } }));
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

const { func, array } = PropTypes;
LotSelect.propTypes = {
    parentState: func,
    lots: array
};

export default Wrapper;
