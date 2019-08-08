import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";

import { humanize } from "utilities";
/* eslint-enable */

const OptionInput = ({ onChange, selected, item }) => (
    <Input
        key={item.id}
        name={item.value}
        label={humanize(item.value)}
        value={item.value}
        inputType="checkbox"
        checked={selected.indexOf(item.value) > -1}
        onChange={onChange}
    />
);

const { object, func, array } = PropTypes;
OptionInput.propTypes = {
    onChange: func,
    item: object,
    selected: array
};

export default OptionInput;