import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Money = props => {
    let { content, children, className = "", type, decimals = 2 } = props;
    if (children) content = children;
    let value = Number(content);
    className += "text--money";
    if (type && type !== "neutral") {
        let direction = "positive";
        if ((type === "positive" && value < 0) || (type === "negative" && value > 0)) {
            direction = "negative";
        }
        className += " text--" + direction;
    }

    content = value < 0 ? "-" : "";
    content += "$" + Math.abs(value).toFixed(decimals);

    return (
        <span className={className} title={content}>
            {content}
        </span>
    );
};

const { node, string, number } = PropTypes;
Money.propTypes = {
    children: node,
    content: node,
    className: string,
    type: string,
    decimals: number
};

export default Money;
