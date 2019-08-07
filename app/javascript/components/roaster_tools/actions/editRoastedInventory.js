import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import ErrorHandler from "shared/errorHandler";
import Titler from "shared/titler";

import { roasterUrl, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class EditRoastedInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                quantity: "",
                adjustment: true
            },
            btnLoading: false,
            errors: []
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    handleSubmit = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { details } = this.state;
        const { userId, current: { id } } = this.props;
        const url = `${roasterUrl(userId)}/inventory_items/${id}`;
        const body = { ...details };

        let response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    };

    // only called after successful submit
    afterSubmit = async response => {
        setTimeout(async () => {
            if (response instanceof Error) {
                // eslint-disable-next-line
                console.log("there was an error", response.response);
                this.setState({ btnLoading: false, errors: response.response });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    this.setState({ btnLoading: false });
                    const { getData, closeModal, successClose } = this.props;
                    const success = "Roasted Inventory Updated!";
                    getData("inventory");
                    if (successClose) {
                        successClose(success);
                    } else if (closeModal) {
                        setTimeout(closeModal, 400);
                    }
                }
            }
        }, 900);

    };

    render() {
        const { details, btnLoading, errors } = this.state;
        const { current: { attributes: { quantity } } } = this.props;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <p>
                    You can make manual adjustments to the amount of roasted inventory you have
                    available to account for donations, inventory errors, spoilage, etc. Negative
                    amounts are not allow. And adjustments cannot be larger than the amount you have 
                    available.
                </p>

                <p>
                    <Titler title="Roasted Amount Available" value={quantity + " lbs"} bold />
                </p>
                
                <Input
                    name="quantity"
                    label="New Inventory Amount"
                    onChange={this.handleInputChange}
                    type="number"
                    value={details.quantity}
                />
                <Flex spacebetween flexend>
                    <Button primary onClick={this.handleSubmit} content="Adust Roasted Amount" loading={btnLoading} />
                </Flex>
            </Form>
        );
    }
}

const { func, oneOfType, string, number, object } = PropTypes;
EditRoastedInventory.propTypes = {
    closeModal: func,
    successClose: func,
    getData: func,
    userId: oneOfType([string, number]),
    current: object
};

export default withContext(EditRoastedInventory);
