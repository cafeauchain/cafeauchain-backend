import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import Context from "contextsv2/main";
/* eslint-enable */

const Wrapper = props => <Context>{ctx => <LotSelect {...props} lots={ctx.lots} />}</Context>;

class LotSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected: {}
        };
    }

    // TODO Revisit how I'm doing this
    componentDidMount() {
        const { lots } = this.props;
        this.getLots(lots);
    }
    componentDidUpdate(props) {
        const { lots: oldLots } = props;
        const { lots } = this.props;
        if (lots && oldLots !== lots) {
            this.getLots(lots);
        }
    }

    buildOption = ({ id, attributes: { name } }) => ({
        text: name,
        value: id,
        key: id,
        id,
        name
    });

    getLots = data => {
        const { parentState } = this.props;
        const options = data.map(this.buildOption);
        this.setState({ options, selected: {} }, parentState({ lotDetails: { lot_id: "" } }));
    };

    getLot = id => {
        const { options } = this.state;
        return options.find(lot => lot.id === id);
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
        const { options, selected } = this.state;
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
                options={options}
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
