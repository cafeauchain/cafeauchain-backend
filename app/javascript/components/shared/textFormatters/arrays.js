import React from "react";
import PropTypes from "prop-types";

const ArrayToString = props => {
    let { content, children } = props;
    if (children) content = children;
    // eslint-disable-next-line
    let values = content.map((obj, idx) => <div key={idx + "temp"}>{Object.values(obj).join(": ") + "%"}</div>);
    return values;
};

const { node, array } = PropTypes;
ArrayToString.propTypes = {
    content: array,
    children: node
};

export default ArrayToString;
