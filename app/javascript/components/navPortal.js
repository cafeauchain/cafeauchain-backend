import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const NavPortal = ({ mountNode, children }) => {
    const navRoot = document.getElementById(mountNode);
    return ReactDOM.createPortal(children, navRoot);
};
NavPortal.propTypes = {
    mountNode: PropTypes.string.isRequired
};

export default NavPortal;
