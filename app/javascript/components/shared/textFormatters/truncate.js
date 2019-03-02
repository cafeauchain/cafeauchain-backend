import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Truncate = props => {
    let { content, children, className = "", style } = props;
    if (children) content = children;
    return (
        <span className={className + " text--truncate"} style={style} title={content}>
            {content}
        </span>
    );
};

const { node, string, object } = PropTypes;
Truncate.propTypes = {
    children: node,
    content: node,
    className: string,
    style: object
};

export default Truncate;
