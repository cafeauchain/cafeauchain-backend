import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Button, Divider } from "semantic-ui-react";
import shortid from "shortid";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";
import DraggableList from "shared/draggableList"
import SizeInput from "wholesale/actions/sizeInput";

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

    async componentDidMount(){
        const { userId: id } = this.props;
        let response = await fetch(ROASTER_URL(id) + "/default_options");
        response = await response.json();
        const defaults = response.reverse().find( item => item.title === "Size" );
        const options = defaults.options.map( item => newDefault(item));
        this.setState({ options, optionId: defaults.id });
    }
    // TODO Handle existing defaults

    buildOptions = options => options.reduce( (arr, { value }) => {
        if( value ){
            return [ ...arr, value ];
        } else {
            return arr;
        }
    }, [])

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { options, optionId } = this.state;
        const { userId, updateContext, defaults, successClose, closeModal } = this.props;
        const body = { title: "Size", options: this.buildOptions(options) };
        let url = `${ROASTER_URL(userId)}/default_options`;
        if( optionId ) url += "/" + optionId;
        const response = await requester({ url, body, method: optionId ? 'PUT' : 'POST' });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                await this.setState({ btnLoading: false });
                const update = { defaults: { ...defaults, size: body.options } };
                if( optionId ){
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

    updateOrder = items => this.setState({ options: items });

    render() {
        const { errors, options, btnLoading } = this.state;
        return (
            <Form>
                <Header as="h2" content="Create Default Product Sizes" />
                <p>
                    These options will be used as the defaults when creating new products. For example, if you usually
                    offer your coffees in 12 oz, 1 lb and 5 lb bags, add those values here and each time you create a
                    new product, it will automatically create three Product Variants with those sizes already defined.
                    Additionally, you will be able to add and remove sizes for each product as necessary.
                </p>
                <ErrorHandler errors={errors} />
                <DraggableList 
                    updateOrder={this.updateOrder}
                    items={options}
                    passedProps={{onRemove: this.onRemove, onChange: this.handleInputChange}}
                />
                <br />
                <Button color="blue" onClick={this.addOption} content="Add Option" />

                <Divider />
                <Button
                    primary
                    floated="right"
                    loading={btnLoading}
                    onClick={this.handleSubmit}
                    content="Create Default Sizes"
                    icon="right arrow"
                    labelPosition="right"
                />
                <div style={{ clear: "both" }} />
            </Form>
        );
    }
}

export default withContext(CreateDefaults);
