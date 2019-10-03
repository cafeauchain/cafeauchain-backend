import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";
import withContext from "contexts/withContext";
/* eslint-enable */

const EditRoastDate = ({ paid_date, id, updateContext, successClose, closeModal }) => {
    const initdetails = {
        paid_date: paid_date || moment().format("YYYY-MM-DD")
    };
    const [btnLoading, updateLoading] = useState(false);
    const [errors, updateErrors] = useState([]);
    const { details, handleInputChange } = useHandleInput(initdetails);

    const callback = response => {
        updateLoading(false);
        const success = "Roast Date Updated!";
        const update = { order: response.data };
        if (successClose) {
            successClose(success, updateContext, update);
        } else if (closeModal) {
            closeModal();
            updateContext(update);
        }
    };

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if (!array || array.length === 0) array = ["Something went wrong"];
        updateErrors(array);
        updateLoading(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        updateLoading(true);
        const url = API_URL + "/invoices/" + id;
        const response = await requester({ url, body: { ...details, update_paid_date_only: true }, method: "PUT" });

        useAfterSubmit(response, callback, errback);
    };
    return (
        <Form>
            {errors.length > 0 && <ErrorHandler errors={errors} />}
            <Input
                type="date"
                label="Paid Date"
                value={details.paid_date}
                onChange={handleInputChange}
            />
            <Button onClick={handleSubmit} content="Update Paid Date" primary loading={btnLoading} />
        </Form>
    );
};

const { string, oneOfType, number, func } = PropTypes;
EditRoastDate.propTypes = {
    paid_date: string,
    id: oneOfType([string, number]),
    closeModal: func,
    successClose: func,
    updateContext: func
};

export default withContext(EditRoastDate);
