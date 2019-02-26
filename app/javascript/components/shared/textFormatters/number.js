import React from "react";
import PropTypes from "prop-types";
import commafy from "commafy";

import "./styles.scss";

const Comma = props => {
    let { content, children, className = "", type, decimals, money, asCents, ...rest } = props;
    if (children) content = children;
    let value = Number(content);
    if (asCents) value = value / 100;
    if (type && type !== "neutral") {
        let direction = "positive";
        if ((type === "positive" && value < 0) || (type === "negative" && value > 0)) {
            direction = "negative";
        }
        className += " text--" + direction;
    }

    let result = value < 0 ? "-" : "";
    result += money ? "$" : "";
    result += value ? commafy(Math.abs(value).toFixed(decimals)) : 0;

    return (
        <span {...rest} className={className + " text--number"}>
            {result}
        </span>
    );
};

const { node, string, number, bool } = PropTypes;
Comma.propTypes = {
    children: node,
    content: node,
    className: string,
    type: string,
    decimals: number,
    money: bool,
    asCents: bool
};

export default Comma;
