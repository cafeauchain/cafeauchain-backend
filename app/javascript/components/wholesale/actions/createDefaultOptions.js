import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Button, Icon, Divider } from "semantic-ui-react";
import shortid from "shortid";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { underscorer, humanize } from "utilities";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const newDefault = (val) => ({ value: val || "", id: shortid.generate() });
class CreateDefaults extends Component {
    static propTypes = () => {
        const { oneOfType, string, number, func } = PropTypes;
        return {
            userId: oneOfType([string, number]),
            updateContext: func
        };
    };
    state = {
        errors: [],
        options: [newDefault()],
        btnLoading: false
    };

    async componentDidMount() {
        const { userId: id } = this.props;
        let response = await fetch(ROASTER_URL(id) + "/default_options");
        response = await response.json();
        const defaults = response.reverse().find(item => item.title === "Options");
        const options = defaults.options.map(item => newDefault(humanize(item)));
        this.setState({ options, optionId: defaults.id });
    }
    // TODO Handle existing defaults

    buildOptions = options => options.reduce((arr, { value }) => {
        if (value) {
            return [...arr, underscorer(value)];
        } else {
            return arr;
        }
    }, [])

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { options, optionId } = this.state;
        const { userId, updateContext, defaults, successClose, closeModal } = this.props;
        const body = { title: "Options", options: this.buildOptions(options).sort() };
        let url = `${ROASTER_URL(userId)}/default_options`;
        if (optionId) url += "/" + optionId;
        const response = await requester({ url, body, method: optionId ? 'PUT' : 'POST' });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                await this.setState({ btnLoading: false });
                const update = { defaults: { ...defaults, options: body.options } };
                if (optionId) {
                    const success = "Defaults Updated!";
                    if (successClose) {
                        successClose(success, updateContext, update);
                    } else if (closeModal) {
                        closeModal();
                        updateContext(update);
                    }
                } else {
                    updateContext(update);
                }
            }
        }
    };

    handleInputChange = (e, { name, value }) => {
        e.preventDefault();
        let { options } = this.state;
        options = [...options];
        let option = options.find(({ id }) => id === name);
        option.value = value;
        this.setState({ options });
    };

    addOption = () => {
        let { options } = this.state;
        const def = newDefault();
        options = [...options, def];
        this.setState({ options });
    };

    onRemove = (e, { idx }) => {
        e.preventDefault();
        let { options } = this.state;
        let arr = [...options];
        arr.splice(idx, 1);
        this.setState({ options: arr });
    };

    render() {
        const { errors, options, btnLoading } = this.state;
        let optionFields = options.map((item, idx) => ({
            name: item.id,
            key: item.id,
            label: "Option " + (idx + 1),
            value: item.value
        }));
        return (
            <Form>
                <Header as="h2" content="Create Default Product Options" />
                <p>
                    These options will be used as the defaults when creating new products. For example, if you usually
                    offer your coffees in whole bean and medium ground, add those values here and each time you create a
                    new product, it will automatically create those Product Options. Additionally, you will be able to
                    add and remove options for each product as necessary.
                </p>
                <ErrorHandler errors={errors} />
                {optionFields.map(({ name, label, value }, idx) => (
                    <div key={name}>
                        <Input action name={name} label={label} onChange={this.handleInputChange} value={value} allowLP>
                            <input data-lpignore="true" />

                            <Button
                                type="button"
                                color="red"
                                icon
                                content={<Icon name="close" />}
                                compact
                                idx={idx}
                                onClick={this.onRemove}
                                disabled={options.length < 2}
                            />
                        </Input>
                    </div>
                ))}
                <br />
                <Button color="blue" onClick={this.addOption} content="Add Option" />

                <Divider />
                <Button
                    primary
                    floated="right"
                    loading={btnLoading}
                    onClick={this.handleSubmit}
                    content="Create Default Options"
                    icon="right arrow"
                    labelPosition="right"
                />
                <div style={{ clear: "both" }} />
            </Form>
        );
    }
}

export default withContext(CreateDefaults);
