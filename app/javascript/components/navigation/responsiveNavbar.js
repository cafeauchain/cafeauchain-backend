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
        const size = width > 600 ? "desktop" : "tablet";
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
        const { rightItems, buttons, header_info } = this.props;
        const { visible, screenSize, menuHeight } = this.state;
        let logoBorder = " no-border";

        return (
            <div className="navbar-spacer" ref={this.menuRef} style={{ paddingTop: menuHeight }}>
                <Menu fixed="top">
                    <Menu.Item className={"header-menu no-left-border" + logoBorder} as="a" href="/">
                        <Image size="mini" src={header_info ? header_info.url : logo} onLoad={this.logoLoaded} />
                        <h2 style={{ margin: "0 0 0 20px" }}>{header_info ? header_info.name : "Cafe au Chain"}</h2>
                    </Menu.Item>
                    {screenSize === "tablet" && (
                        <F>
                            <Menu.Item onClick={this.handleToggle} className="no-border" position="right">
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
                                    content={menuItemBuilder(rightItems.concat(buttons))}
                                />
                            </Sidebar.Pushable>
                        </F>
                    )}
                    {screenSize === "desktop" && (
                        <Menu.Menu
                            position="right"
                            content={menuItemBuilder(rightItems.concat(buttons))}
                        />
                    )}
                    
                </Menu>
            </div>
        );
    }
}

const { array, object } = PropTypes;
NavBar.propTypes = {
    rightItems: array,
    buttons: array,
    header_info: object
};

export default NavBar;
