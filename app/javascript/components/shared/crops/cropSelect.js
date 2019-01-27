import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import readCookie from "../../utilities/readCookie";
// import paramatize from "../../utilities/params";

class CropSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onSelect = (event, { value }) => {
        const { onSelect } = this.props
        onSelect(value)
    }

    render = () => {
        const { cropOptions } = this.props
        return(
            <Form.Dropdown placeholder='Select Crop' fluid search deburr selection options={cropOptions} onChange={this.onSelect} />
        )
    }

}

const { array } = PropTypes;
CropSelect.propTypes = {
    cropOptions: array
}

export default CropSelect;