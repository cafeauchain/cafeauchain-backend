import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const LongText = props => {
    let { content, children, className = "", style } = props;
    if (children) content = children;
    return (
        <div className={className} style={style} title={content}>
            {content}
        </div>
    );
};

const { node, string, object } = PropTypes;
LongText.propTypes = {
    children: node,
    content: node,
    className: string,
    style: object
};

export default LongText;
