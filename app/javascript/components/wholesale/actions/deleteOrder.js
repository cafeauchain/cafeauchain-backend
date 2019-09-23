import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Confirm } from "semantic-ui-react";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils"; 
import { useAfterSubmit } from "utilities/hooks";

import withContext from "contexts/withContext";
/* eslint-enable */

const DeleteOrder = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [errors, updateErrors] = useState([]);

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if (!array || array.length === 0) array = ["Something went wrong"];
        updateErrors(array);
    };
    const deleteOrder = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const url = `${ API_URL }/orders/${ id }`;
        const response = await requester({ url, method: "DELETE" });
        useAfterSubmit(response, null, errback); 
    };
    const showConfirm = () => setOpen(true);
    const closeConfirm = () => setOpen(false);
    
    return (
        <>
            {errors.length > 0 && <ErrorHandler errors={errors} />}
            <Button content="Delete Order" onClick={showConfirm} negative />
            <Confirm
                header={"Delete Order #" + id + "?"}
                open={open}
                onCancel={closeConfirm}
                onConfirm={deleteOrder}
                size='mini'
                content="This action cannot be undone. Please confirm that you do want to delete this order."
                confirmButton={{ content: "Delete Order", negative: true, primary: false }}
            />
        </>
    );
};

const { oneOfType, number, string } = PropTypes;
DeleteOrder.propTypes = {
    id: oneOfType([number, string])
};

export default withContext(DeleteOrder);