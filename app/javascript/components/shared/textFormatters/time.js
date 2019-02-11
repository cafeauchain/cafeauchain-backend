import PropTypes from "prop-types";
import moment from "moment";
import "./styles.scss";

const Time = props => {
    let { content, children } = props;
    if (children) content = children;
    const result = moment(content).calendar();
    return result;
};

const { node, string } = PropTypes;
Time.propTypes = {
    children: node,
    content: node,
    className: string
};

export default Time;
