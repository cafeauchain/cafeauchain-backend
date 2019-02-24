import PropTypes from "prop-types";
import "./styles.scss";

const Weights = props => {
    let { content, children } = props;
    if (children) content = children;
    let value = Number(content);
    const result = value >= 16 ? value / 16 + " lb" : value + " oz";
    return result;
};

const { node, string } = PropTypes;
Weights.propTypes = {
    children: node,
    content: node,
    className: string
};

export default Weights;
