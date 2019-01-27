import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import API_URL from "../../utilities/apiUtils/url";
// import readCookie from "../../utilities/readCookie";
// import paramatize from "../../utilities/params";

class ProducerSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            producerOptions: [],
            producers: []
        }
    }

    componentDidMount = async () => {
        this.getProducers()
    }

    getProducers = async () => {
        const url = `${API_URL}/producers`;
        const { producerOptions } = this.state;
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const producers = responseJson.data;
            producers.map(producer => {
                producerOptions.push({key: producer.id, value: producer.attributes.slug, text: producer.attributes.name})
            })
            this.setState({ producerOptions, producers });
        }
    };

    onSelect = (event, { value }) => {
        const { onSelect } = this.props
        onSelect(value)
    }

    addProducer = (event, { value }) => {
        const { addProducer } = this.props
        addProducer(value)
    }

    render = () => {
        const { producerOptions } = this.state
        return(
            <Form.Dropdown 
                placeholder='Select Producer' 
                fluid 
                search 
                selection 
                deburr 
                allowAdditions 
                options={producerOptions} 
                onChange={this.onSelect} 
                onAddItem={this.addProducer}
            />
        )
    }

}

const { func } = PropTypes;
ProducerSelect.propTypes = {
    onSelect: func,
    addProducer: func
}

export default ProducerSelect;