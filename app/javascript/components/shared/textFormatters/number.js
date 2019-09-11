import React from "react";
import PropTypes from "prop-types";
import commafy from "commafy";

import "./styles.scss";

const Comma = props => {
    let { content, children, className = "", type, decimals, money, asCents, raw, anyDecimals, ...rest } = props;
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
    const abs = Math.abs(value);
    result += value ? commafy(anyDecimals ? abs : abs.toFixed(decimals)) : 0;

    if( raw ) return result;

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
    asCents: bool,
    raw: bool,
    anyDecimals: bool
};

export default Comma;
