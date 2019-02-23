import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import API_URL from "utilities/apiUtils/url";
import requester from "utilities/apiUtils/requester";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <ProducerSelect
                {...props}
                producers={ctx.producers}
                getCtxData={ctx.getData}
                updateContext={ctx.updateContext}
            />
        )}
    </Context>
);

class ProducerSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        };
    }

    componentDidMount() {
        const { producers, getCtxData } = this.props;
        if (producers === undefined) {
            getCtxData("producers");
        }
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
        const { parentState, updateContext } = this.props;
        let { producers } = this.props;
        const url = `${API_URL}/producers`;
        const body = { producer_profile: { name: value } };
        const responseJson = await requester({ url, body });
        if (responseJson instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error");
        } else {
            const { data } = responseJson;
            const producer = this.buildProducer(data);
            await updateContext({ producers: [data, ...producers] });
            await this.setState({ selected: producer });
            parentState({ producerId: producer.slug });
        }
    };

    getProducer = id => {
        const { producers } = this.props;
        return producers.find(({ attributes: { slug } }) => slug === id);
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
        const { selected } = this.state;
        let { producers } = this.props;
        if (producers === undefined) producers = [];
        const producerOptions = producers.map(this.buildProducer);
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
                options={producerOptions}
                onChange={this.onSelect}
                onAddItem={this.addProducer}
            />
        );
    };
}

const { func, array } = PropTypes;
ProducerSelect.propTypes = {
    parentState: func,
    producers: array,
    getCtxData: func,
    updateContext: func
};

export default Wrapper;
