import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";

const AsImage = props => {
    const { content, ...rest } = props;
    return <Image {...rest} src={content} />;
};

const { node } = PropTypes;
AsImage.propTypes = {
    content: node
};

export default AsImage;
