import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Addresses from "shared/addresses";

import { usStates } from "utilities";
/* eslint-enable */

const Step2Fields = ({ handleChange, values }) => <Addresses onChange={handleChange} details={{ ...values }} />;

const { func, object } = PropTypes;
Step2Fields.propTypes = {
    handleChange: func,
    values: object
};

export default Step2Fields;
