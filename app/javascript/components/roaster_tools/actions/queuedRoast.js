import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import ErrorHandler from "shared/errorHandler";

import { roasterUrl, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class QueuedRoast extends Component {
    constructor(props){
        super(props);
        const { current: { attributes }, inventory } = props;
        const profile = inventory.find(item => item.id === attributes.inventory_item_id);
        const { attributes: { roast_size } } = profile;
        const starting_amount = (Number(roast_size) * Number(attributes.roast_count)).toFixed(2);
        const details = {
            starting_amount,
            roast_date: attributes.roast_date,
            roast_count: attributes.roast_count,
            roast_size
        };
        this.state = {
            details,
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
        if (name === "roast_count" || name === "roast_size" || name === "inventory_item_id") {
            details["starting_amount"] = (details["roast_count"] * details["roast_size"]).toFixed(2);
        }
        this.setState({ details });
    };

    handleSubmit = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { details } = this.state;
        const { userId, current: { id } } = this.props;
        const url = `${roasterUrl(userId)}/batches/${id}`;
        const body = {...details, status: "roast_in_progress"};

        let response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit(response);
    };

    // only called after successful submit
    afterSubmit = async response => {
        setTimeout(async() => {
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
                    const success = "Batch Started!";
                    getData("batches");
                    getData("queued");
                    if (successClose) {
                        successClose(success);
                    } else if(closeModal) {
                        setTimeout(closeModal, 400);
                    }   
                }
            }
        }, 900);
        
    };

    render() {
        const { details, btnLoading, errors } = this.state;
        const { current: { attributes: { target_weight, shrinkage }} } = this.props;
        const estimate = parseFloat((Number(details.starting_amount) * (1 - Number(shrinkage)/100)).toFixed(2));
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <p>
                    <strong>Amount Needed: </strong>
                    {`${target_weight} lbs`}
                </p>
                <Input
                    name="roast_date"
                    label="Roast Date"
                    onChange={this.handleInputChange}
                    type="date"
                    value={details.roast_date}
                />
                <Input
                    name="roast_count"
                    label="Number of Roasts"
                    type="number"
                    onChange={this.handleInputChange}
                    value={details.roast_count}
                />
                <Input
                    name="roast_size"
                    label="Roast Size"
                    type="number"
                    onChange={this.handleInputChange}
                    value={details.roast_size}
                />
                <p>
                    <strong>Starting Weight: </strong>
                    {`${details.starting_amount} lbs`}
                </p>
                <p>
                    <strong>Estimated Yield: </strong>
                    {`${estimate} lbs`}
                </p>
                <Flex spacebetween flexend>
                    <Button primary onClick={this.handleSubmit} content="Start Batch" loading={btnLoading} />
                </Flex>
            </Form>
        );
    }
}

const { array, func, oneOfType, string, number, object } = PropTypes;
QueuedRoast.propTypes = {
    closeModal: func,
    successClose: func,
    getData: func,
    userId: oneOfType([string, number]),
    inventory: array,
    current: object
};

export default withContext(QueuedRoast);
