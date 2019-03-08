import React from "react";
import PropTypes from "prop-types";
import AsNumber from "./number";

const NegMoney = props => {
    let { decimals = 2 } = props;
    return <AsNumber {...props} type="negative" decimals={decimals} money />;
};

const { node, string, number } = PropTypes;
NegMoney.propTypes = {
    children: node,
    content: node,
    className: string,
    type: string,
    decimals: number
};

export default NegMoney;
