import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Truncate = props => {
    let { content, children, className = "" } = props;
    if (children) content = children;
    return (
        <span className={className + " text--truncate"} title={content}>
            {content}
        </span>
    );
};

const { node, string } = PropTypes;
Truncate.propTypes = {
    children: node,
    content: node,
    className: string
};

export default Truncate;
