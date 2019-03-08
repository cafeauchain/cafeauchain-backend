import React from "react";
import PropTypes from "prop-types";
import AsNumber from "./number";

const PosMoney = props => {
    let { decimals = 2 } = props;
    return <AsNumber {...props} type="positive" decimals={decimals} money />;
};

const { node, string, number } = PropTypes;
PosMoney.propTypes = {
    children: node,
    content: node,
    className: string,
    type: string,
    decimals: number
};

export default PosMoney;
