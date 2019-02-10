import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import API_URL from "utilities/apiUtils/url";
import requester from "utilities/apiUtils/requester";

import Producers from "contexts/producers";
/* eslint-enable */

const Wrapper = props => (
    <Producers>{producers => <ProducerSelect {...props} producers={producers.producers} />}</Producers>
);

class ProducerSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producers: [],
            selected: {}
        };
    }

    componentDidMount() {
        this.getProducers();
    }

    buildProducer = data => {
        const { attributes, id } = data;
        const { name, slug } = attributes;
        return {
            text: name,
            value: slug,
            key: id,
            slug,
            id,
            name
        };
    };

    addProducer = async (event, { value }) => {
        const { parentState } = this.props;
        let { producers } = this.state;
        producers = [...producers];
        const url = `${API_URL}/producers`;
        const body = { producer_profile: { name: value } };
        const responseJson = await requester({ url, body });
        if (responseJson instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error");
        } else {
            const { data } = responseJson;
            const producer = this.buildProducer(data);
            producers = [producer, ...producers];
            // TODO probably need to have something in here to update Producer context
            this.setState({ producers, selected: producer }, parentState({ producerId: producer.slug }));
        }
    };

    getProducers = () => {
        const { producers: data } = this.props;
        const producers = data.map(this.buildProducer);
        this.setState({ producers });
    };

    getProducer = id => {
        const { producers } = this.state;
        return producers.find(producer => producer.slug === id);
    };

    onSelect = (event, { value }) => {
        const { parentState } = this.props;
        const producer = this.getProducer(value);
        if (!producer) {
            // eslint-disable-next-line
            console.log("producer wasnt found. It was probably an add. Let the add handle the state update.");
            return;
        }
        this.setState({ selected: producer }, parentState({ producerId: value }));
    };

    render = () => {
        const { producers, selected } = this.state;
        const value = selected ? selected.value : undefined;

        return (
            <Form.Dropdown
                placeholder="Select Producer"
                fluid
                search
                selection
                deburr
                allowAdditions
                value={value}
                options={producers}
                onChange={this.onSelect}
                onAddItem={this.addProducer}
            />
        );
    };
}

const { func, array } = PropTypes;
ProducerSelect.propTypes = {
    parentState: func,
    producers: array
};

export default Wrapper;
