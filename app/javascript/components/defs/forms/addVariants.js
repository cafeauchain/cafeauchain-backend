import React, { Fragment as F } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import { Weights } from "shared/textFormatters";
import Input from "shared/input";
/* eslint-enable */

const FormattedInput = ({ isNew, ...rest }) => <Input {...rest} label="" type="number" object="variants" />;

const ConditionalInput = ({ isNew, ...rest }) => {
    if (isNew) {
        return (
            <F>
                <Input {...rest} label="" type="number" object="variants" placeholder="Size (in ounces)" />
                <Weights {...rest} />
            </F>
        );
    }
    return <Weights {...rest} />;
};

const { bool } = PropTypes;
FormattedInput.propTypes = { isNew: bool };
ConditionalInput.propTypes = {
    isNew: bool
};

const tableDefs = {
    fields: [
        {
            name: "size",
            label: "size",
            formatter: ConditionalInput
        },
        {
            name: "price_in_dollars",
            label: "Price",
            formatter: FormattedInput
        }
    ],
    props: {
        celled: true,
        sortable: true,
        verticalAlign: "top"
    }
};

export default tableDefs;
