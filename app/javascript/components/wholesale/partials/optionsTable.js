import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";

import { humanize, underscorer } from "utilities";
/* eslint-enable */

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultOptions: [],
            added: [],
            selected: [],
            addedOption: ""
        };
    }

    componentDidUpdate(props) {
        const { options } = props;
        const { options: newOptions } = this.props;
        if (!options.length && newOptions.length) {
            // eslint-disable-next-line
            this.setState({ defaultOptions: newOptions, selected: newOptions });
        }
    }

    addOption = e => {
        e.preventDefault();
        const { setOptions } = this.props;
        const { addedOption, selected, added } = this.state;
        const modified = underscorer(addedOption);
        const updated = [...selected, modified];
        setOptions(updated);
        this.setState({ addedOption: "", selected: updated, added: [...added, modified] });
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
            selected.splice(index, 1);
        }
        setOptions(selected);
        this.setState({ selected });
    };
    render() {
        const { addedOption, selected, defaultOptions, added } = this.state;
        const options = [...defaultOptions, ...added];
        return (
            <div style={{ marginBottom: 5 }}>
                <Header as="h3" content="Product Options" style={{ marginBottom: 10 }} />
                {options.map(item => {
                    return (
                        <Input
                            key={item}
                            name={item}
                            label={humanize(item)}
                            value={item}
                            inputType="checkbox"
                            checked={selected.indexOf(item) > -1}
                            onChange={this.handleInputChange}
                        />
                    );
                })}
                <Input
                    name="options"
                    label=""
                    placeholder="Name"
                    action
                    onChange={this.handleOptionInputChange}
                    value={addedOption}
                    onKeyPress={this.handleEnter}
                >
                    <input data-lpignore="true" />
                    <Button type="button" color="blue" content="Add Option" onClick={this.addOption} />
                </Input>
            </div>
        );
    }
}

const { array, func } = PropTypes;
Options.propTypes = {
    options: array,
    setOptions: func
};

export default Options;
