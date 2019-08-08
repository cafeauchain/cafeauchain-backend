import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Icon, Image, Menu, Sidebar } from "semantic-ui-react";

// eslint-disable-next-line
import logo from "images/cac-unofficial-logo.png";

const menuItemBuilder = array => array.map(item => <Menu.Item key={item.key} {...item} />);

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.menuRef = React.createRef();
        this.state = {
            visible: false,
            screenSize: this.getScreenSize(),
            menuHeight: 50
        };
        // TODO Rework the nav so it reformats based on menu item width and screenSize
        // making sure that all nav items fit appropriately
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    logoLoaded = () => {
        let { menuHeight } = this.state;
        if (this.menuRef.current) {
            let el = this.menuRef.current.getElementsByClassName("header-menu")[0];
            if (menuHeight !== el.offsetHeight) {
                this.setState({ menuHeight: el.offsetHeight });
            }
        }
    };

    getScreenSize = () => {
        const width = window.innerWidth;
        const size = width > 999 ? "desktop" : (width < 660 ? "mobile" : "tablet");
        return size;
    };

    handleWindowResize = () => {
        const { screenSize } = this.state;
        let newScreenSize = this.getScreenSize();

        if (screenSize !== newScreenSize) {
            this.setState({ screenSize: newScreenSize });
        }
    };

    handleToggle = () =>
        this.setState(prevState => {
            return { visible: !prevState.visible };
        });

    render() {
        const { rightItems, buttons, header_info, loggedInRoaster, children } = this.props;
        const { visible, screenSize, menuHeight } = this.state;
        let logoBorder = " no-border";

        let modRightItems = Array.isArray(rightItems) ? 
            rightItems : screenSize === "mobile" ? 
                rightItems.mobile : rightItems.desktop;

        return (
            <div className="navbar-spacer" ref={this.menuRef} style={{ paddingTop: menuHeight }}>
                <Menu fixed="top">
                    <Menu.Item className={"header-menu no-left-border" + logoBorder}>
                        <Image 
                            size="mini"
                            src={header_info ? header_info.url : logo}
                            onLoad={this.logoLoaded}
                            as="a"
                            href="/"
                        />
                        <h2 style={{ margin: 0 }}>
                            <a href="/" style={{ paddingLeft: 20, color: "black", display: "block" }}>
                                {header_info ? header_info.name : "Cafe au Chain"}
                            </a>
                        </h2>
                    </Menu.Item>
                    {screenSize !== "mobile" && (
                        <Menu.Menu
                            content={menuItemBuilder(modRightItems.concat(buttons))}
                            style={{ marginLeft: 'auto' }}
                        />
                    )}
                    {(screenSize === "mobile" || (screenSize === "tablet" && loggedInRoaster)) && (
                        <F>
                            <Menu.Item 
                                onClick={this.handleToggle}
                                className="no-border menu-trigger"
                                style={{marginLeft: screenSize === "mobile" ? "auto" : 0}}
                            >
                                <Icon name="sidebar" />
                            </Menu.Item>
                            <Sidebar.Pushable
                                style={{
                                    top: "100%",
                                    position: "absolute",
                                    minHeight: "100vh",
                                    width: "100%",
                                    visibility: visible ? "visible" : "hidden"
                                }}
                            >
                                <Sidebar.Pusher dimmed={visible} onClick={this.handleToggle} />
                                <Sidebar
                                    as={Menu}
                                    animation="overlay"
                                    vertical
                                    visible={visible}
                                    content={(
                                        <div className={
                                            "sidebar-menu-container" + 
                                            (children ? " responsive-sidebar-items" : "")
                                        }
                                        >
                                            {screenSize === "mobile" && (
                                                <React.Fragment>
                                                    {menuItemBuilder(modRightItems)}
                                                    {children}
                                                    {menuItemBuilder(buttons)}
                                                </React.Fragment>
                                            )}
                                            {screenSize === "tablet" && children}
                                        </div>
                                    )}
                                />
                            </Sidebar.Pushable>
                        </F>
                    )}   
                </Menu>
            </div>
        );
    }
}

const { array, object, node, bool, oneOfType } = PropTypes;
NavBar.propTypes = {
    rightItems: oneOfType([array, object]),
    buttons: array,
    header_info: object,
    children: node,
    loggedInRoaster: bool
};

export default NavBar;
