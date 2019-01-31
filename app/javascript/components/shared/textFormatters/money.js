import React from "react";
import PropTypes from "prop-types";
import AsNumber from "./number";

const Money = props => {
    let { decimals = 2 } = props;
    return <AsNumber {...props} decimals={decimals} money />;
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
