import React from "react";
import PropTypes from "prop-types";

const ArrayToString = props => {
    let { content, children, keys, output } = props;
    if (children) content = children;
    // eslint-disable-next-line
    let values = content.map((obj, idx) => <div key={idx + "temp"}>{output(keys.map(key => obj[key]))}</div>);
    return values;
};

const { node, array } = PropTypes;
ArrayToString.propTypes = {
    content: array,
    children: node
};

export default ArrayToString;
