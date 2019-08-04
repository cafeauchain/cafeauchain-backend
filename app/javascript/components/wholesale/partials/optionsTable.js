import React from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import DraggableList from "shared/draggableList";
import OptionInput from "wholesale/partials/optionInput";

import { underscorer } from "utilities";
/* eslint-enable */

class Options extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.options,
            addedOption: ""
        };
    }

    componentDidUpdate(props) {
        const { options } = props;
        const { options: newOptions } = this.props;
        if (newOptions.length && newOptions !== options) {
            // eslint-disable-next-line
            this.setState({ selected: newOptions });
        }
    }

    addOption = e => {
        e.preventDefault();
        const { setOptions } = this.props;
        const { addedOption, selected } = this.state;
        const modified = underscorer(addedOption);
        const updated = [...selected, modified];
        setOptions(updated);
        this.setState({ addedOption: "", selected: updated });
    };

    handleOptionInputChange = (e, { value }) => {
        this.setState({ addedOption: value });
    };

    handleEnter = e => {
        if (e.key === "Enter") {
            this.addOption(e);
        }
    };

    handleInputChange = (e, { value, checked }) => {
        const { setOptions } = this.props;
        let { selected } = this.state;
        selected = [...selected];
        let index = selected.indexOf(value);
        if (checked) {
            selected.push(value);
        } else {
            if (selected.length > 1) {
                selected.splice(index, 1);
            } else {
                return;
            }
        }
        setOptions(selected);
        this.setState({ selected });
    };

    updateOrder = arr => {
        const { setOptions } = this.props;
        const selected = arr.map(item => item.value);
        this.setState({ selected }, setOptions(selected));
    };

    render() {
        const { options } = this.props;
        const optionsAsObj = options.map( item => ({value: item, id: item }));
        const { addedOption, selected } = this.state;
        return (
            <div style={{ marginBottom: 5 }}>
                <Header as="h3" content="Product Options" style={{ marginBottom: 38 }} />
                <DraggableList
                    updateOrder={this.updateOrder}
                    items={optionsAsObj}
                    passedProps={{ 
                        onChange: this.handleInputChange,
                        selected
                    }}
                    component={OptionInput}
                />
                <Input
                    name="options"
                    label=""
                    placeholder="Name"
                    action
                    onChange={this.handleOptionInputChange}
                    value={addedOption}
                    onKeyPress={this.handleEnter}
                    allowLP
                >
                    <input data-lpignore="true" />
                    <Button type="button" color="blue" content="Add Option" onClick={this.addOption} />
                </Input>
            </div>
        );
    }
}

const { func, array } = PropTypes;
Options.propTypes = {
    options: array,
    setOptions: func
};

export default Options;
