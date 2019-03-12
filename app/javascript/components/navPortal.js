import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const NavPortal = ({ mountNode, children }) => {
    const navRoot = document.getElementById(mountNode);
    return navRoot ? ReactDOM.createPortal(children, navRoot) : null;
};
NavPortal.propTypes = {
    mountNode: PropTypes.string.isRequired
};

export default NavPortal;
