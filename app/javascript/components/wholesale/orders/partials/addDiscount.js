import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";

import { url as API_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

const Discount = ({discount, id, updateContext}) => {

    const { handleInputChange, details } = useHandleInput({discount: parseFloat(discount).toFixed(2)});
    const [ showForm, updateShowForm ] = useState(false);
    const [ errors, updateErrors ] = useState([]);

    const showDiscounter = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        return updateShowForm(prevState => !prevState);
    };

    const callback = response => {
        updateContext({ order: response.data });
        updateShowForm(false);
    };

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if (!array || array.length === 0) array = ["Something went wrong"];
        updateErrors(array);
    };

    const validateInput = () => {
        let inner = {...details};
        if( inner.discount === "" ){
            inner.discount = 0;
        }
        return inner;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const url = API_URL + "/invoices/" + id + "?process_discount=true";
        const body = validateInput();

        const response = await requester({ url, body, method: "PUT" });

        useAfterSubmit(response, callback, errback);
    };

    return (
        <>
            {showForm && (
                <Form>
                    {errors.length > 0 && <ErrorHandler errors={errors} />}
                    <Input 
                        type="number"
                        label="Discount Amount"
                        name="discount"
                        value={details.discount}
                        onChange={handleInputChange}
                    />
                    <Button content="Apply Discount" onClick={handleSubmit} />
                </Form>
            )}
            {!showForm && <Button content="Discount Invoice" onClick={showDiscounter} />}
        </>
    );
};

const { oneOfType, number, string, func } = PropTypes;
Discount.propTypes = {
    id: oneOfType([number, string]),
    updateContext: func,
    discount: string
};
export default Discount;
