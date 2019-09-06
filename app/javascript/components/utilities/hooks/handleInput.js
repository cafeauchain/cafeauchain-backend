import { useState } from 'react';

/* eslint-disable */
import { namespacer } from "utilities";
/* eslint-enable */

const useHandleInput = initialValues => {
    const [details, updateDetails] = useState(initialValues);

    const handleInputChange = (event, { value, name, checked, ...rest }) => {
        let newdetails = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (rest["data-namespace"]) {
            namespacer(rest["data-namespace"], newdetails)[name] = val || "";
        } else {
            newdetails[name] = val || "";
        }
        updateDetails(newdetails);
    };


    return {
        handleInputChange,
        details,
        updateDetails
    };
};

export default useHandleInput;