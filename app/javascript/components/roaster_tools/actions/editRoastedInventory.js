import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import ErrorHandler from "shared/errorHandler";

import { roasterUrl, requester } from "utilities/apiUtils";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";

import withContext from "contexts/withContext";
/* eslint-enable */

const EditRoastedInventory = props =>  {
    const { getData, closeModal, successClose, userId, current: { id } } = props;
    const { handleInputChange, details } = useHandleInput({quantity: ""});
    const [ errors, updateErrors ] = useState([]);
    const [ btnLoading, updateLoading ] = useState(false);

    const callback = () => {
        updateLoading(false);
        const success = "Roasted Inventory Updated!";
        getData("inventory");
        if (successClose) {
            successClose(success);
        } else if (closeModal) {
            setTimeout(closeModal, 400);
        }
    };

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if (!array || array.length === 0) array = ["Something went wrong"];
        updateErrors(array);
        updateLoading(false);
    };

    const handleSubmit = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        await updateLoading(true);
        const url = `${roasterUrl(userId)}/inventory_items/${id}`;
        const body = { ...details, adjustment: true };

        let response = await requester({ url, body, method: 'PUT' });
        useAfterSubmit(response, callback, errback);
    };

    return (
        <Form>
            {errors.length > 0 && <ErrorHandler errors={errors} />}
            <p>
                    You can make manual adjustments to the amount of roasted inventory you have
                    available to account for donations, inventory errors, spoilage, etc. Negative
                    amounts are not allow.
            </p>
                
            <Input
                name="quantity"
                label="Current Surplus"
                onChange={handleInputChange}
                type="number"
                value={details.quantity}
            />
            <Flex spacebetween flexend>
                <Button primary onClick={handleSubmit} content="Edit Surplus" loading={btnLoading} />
            </Flex>
        </Form>
    );
};

const { func, oneOfType, string, number, object } = PropTypes;
EditRoastedInventory.propTypes = {
    closeModal: func,
    successClose: func,
    getData: func,
    userId: oneOfType([string, number]),
    current: object
};

export default withContext(EditRoastedInventory);
