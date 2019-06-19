import React from "react";
import PropTypes from "prop-types";

const Enabler = ({ content }) => {
    const color = content ? "positive" : "negative";
    const text = content ? "Enabled" : "Disabled";
    return (
        <span className={`text--${ color }`}>
            {text}
        </span>
    );
};

Enabler.propTypes = {
    content: PropTypes.bool
};

export default Enabler;
