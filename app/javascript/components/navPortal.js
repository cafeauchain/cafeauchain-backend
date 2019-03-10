import ReactDOM from "react-dom";

const navRoot = document.getElementById("main-nav");

const NavPortal = ({ children }) => ReactDOM.createPortal(children, navRoot);

export default NavPortal;
