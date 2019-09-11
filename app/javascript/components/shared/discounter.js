import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
import { Money } from "shared/textFormatters";
/* eslint-enable */


const Discounter = ({ original, discount, linebreak = false, spacer = false }) => {
    original = Number(original);
    discount = Number(discount);
    const isDiscounted = discount < original;
    return (
        <>
            {isDiscounted ? (
                <>
                    <span className="slasher">
                        <Money>{original}</Money>
                    </span>
                    {linebreak && <br />}
                    {spacer && " "}
                    <Money type="positive">{discount}</Money>
                </>
            ) : (
                <Money type="positive">{original}</Money>
            )}
        </>
    );
};

const { oneOfType, number, string, bool } = PropTypes;
Discounter.propTypes = {
    original: oneOfType([number, string]),
    discount: oneOfType([number, string]),
    linebreak: bool,
    spacer: bool
};

export default Discounter;