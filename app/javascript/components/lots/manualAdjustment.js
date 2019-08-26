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

class ManualLotAdjustment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                adjustment: ""
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
        const { userId, lot: { id } } = this.props;
        const url = `${roasterUrl(userId)}/lots/${id}`;
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
                    const { updateContext, closeModal, successClose } = this.props;
                    const success = "Green Inventory Updated!";
                    updateContext({ "lot": response.data });
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
        const { lot: { attributes: { on_hand } } } = this.props;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <p>
                    You can make manual adjustments to the amount of green inventory you have
                    available to account for inventory errors, spoilage, leftovers, etc. Adjustments
                    reduce the amount of green coffee on hand. Negative amounts are not allow. And 
                    adjustments cannot be larger than the amount you have available in house. Each 
                    adjustment will be recorded in your transaction history.
                </p>

                <p>
                    <Titler title="Green Amount Available" value={on_hand.toFixed(1) + " lbs"} bold />
                </p>

                <Input
                    name="adjustment"
                    label="Adjustment Amount"
                    onChange={this.handleInputChange}
                    type="number"
                    value={details.adjustment}
                />
                <Flex spacebetween flexend>
                    <Button primary onClick={this.handleSubmit} content="Adjust Roasted Amount" loading={btnLoading} />
                </Flex>
            </Form>
        );
    }
}

const { func, oneOfType, string, number, object } = PropTypes;
ManualLotAdjustment.propTypes = {
    closeModal: func,
    successClose: func,
    updateContext: func,
    userId: oneOfType([string, number]),
    lot: object
};

export default withContext(ManualLotAdjustment);
