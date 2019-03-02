import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Button, Icon } from "semantic-ui-react";
import shortid from "shortid";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import { Weights } from "shared/textFormatters";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>{ctx => <CreateDefaults {...props} userId={ctx.userId} getCtxData={ctx.getData} />}</Context>
);

const newDefault = () => ({ value: "", id: shortid.generate() });
class CreateDefaults extends Component {
    static propTypes = () => {
        const { oneOfType, string, number, func } = PropTypes;
        return {
            userId: oneOfType([string, number]),
            getCtxData: func,
            closeModal: func,
            successClose: func
        };
    };
    state = {
        errors: [],
        options: [newDefault()],
        btnLoading: false
    };
    // TODO Handle existing defaults

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { options } = this.state;
        const { userId, successClose, closeModal } = this.props;
        // eslint-disable-next-line
        const body = { title: "Size", options: options.map(({ value }) => value) };
        // eslint-disable-next-line
        const url = `${ROASTER_URL(userId)}/variant_defaults`;
        // const response = await requester({ url, body });
        const response = true;
        alert("Not actually submitting form. Endpoint not working");
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                const success = "Default Sizes were created successfully!";
                await this.setState({ btnLoading: false });
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    setTimeout(closeModal, 900);
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
            label: "Size " + (idx + 1) + " (in ounces)",
            value: item.value
        }));
        return (
            <Form>
                <Header as="h2" content="Create Default Product Sizes" />
                <p>
                    These options will be used as the defaults when creating new products. For example, if you ususally
                    offer your coffees in 12 oz, 1 lb and 5 lb bags, add those values here and each time you create a
                    new product, it will automatically create three Product Variants with those sizes already defined.
                    Additionally, you will be able to add and remove sizes for each product as necessary.
                </p>
                <ErrorHandler errors={errors} />
                {optionFields.map(({ name, label, value }, idx) => (
                    <div key={name}>
                        <Input
                            action
                            name={name}
                            label={label}
                            onChange={this.handleInputChange}
                            value={value}
                            type="number"
                        >
                            <input />
                            {options.length > 1 && (
                                <Button
                                    type="button"
                                    color="red"
                                    icon
                                    content={<Icon name="close" />}
                                    compact
                                    idx={idx}
                                    onClick={this.onRemove}
                                />
                            )}
                        </Input>
                        {Number(value) >= 16 && (
                            <div style={{ margin: "-10px 0 10px" }}>
                                <span>(Weight in lbs: </span>
                                <Weights>{value === "" ? Number(0) : value}</Weights>
                                <span>)</span>
                            </div>
                        )}
                    </div>
                ))}
                <br />
                <Button color="blue" onClick={this.addOption} content="Add Option" />
                <br />
                <br />
                <Button primary fluid loading={btnLoading} onClick={this.handleSubmit} content="Create Defaults" />
            </Form>
        );
    }
}

export default Wrapper;
