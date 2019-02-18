import React, { Fragment as F } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Flex from "shared/flex";

import { namespacer, humanize } from "utilities";
/* eslint-disable */

const Details = ({ attributes, leftWidth, fields, leftStyles, rightStyles }) => {
    const buildDetails = () => {
        return fields.map(field => {
            const { namespace, name, label, formatter: Formatter, ...rest } = field;
            let value = namespace ? namespacer(namespace, attributes)[name] : attributes[name];
            if (Formatter) value = <Formatter content={value} />;
            return (
                <Flex {...rest} key={name}>
                    <div flex="auto" style={{ width: leftWidth, ...leftStyles }}>
                        {label || humanize(name)}
                    </div>
                    <div flex="fill" style={{ ...rightStyles }}>
                        {value}
                    </div>
                </Flex>
            );
        });
    };

    return <F>{buildDetails()}</F>;
};

const { oneOfType, number, string, object } = PropTypes;
Details.propTypes = {
    leftWidth: oneOfType([number, string]),
    attributes: object
};

export default Details;
