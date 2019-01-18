import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";

import logo from "../../../assets/images/cac-unofficial-logo.png";

const menuItemBuilder = array => array.map(item => <Menu.Item key={item.key} {...item} />);

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.menuRef = React.createRef();
        this.state = {
            visible: false,
            screenSize: this.getScreenSize(),
            menuHeight: 60
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
            let el = this.menuRef.current.getElementsByClassName("right-side-menu")[0];
            if (menuHeight !== el.offsetHeight + 10) {
                this.setState({ menuHeight: el.offsetHeight + 10 });
            }
        }
    };

    getScreenSize = () => {
        const width = window.innerWidth;
        let size = "mini";
        if (width > 600) {
            size = "desktop";
        } else if (width > 340) {
            size = "tablet";
        }
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
        const { leftItems, rightItems } = this.props;
        const { visible, screenSize, menuHeight } = this.state;
        let logoBorder = leftItems.length ? "" : " no-border";

        return (
            <div className="navbar-spacer" ref={this.menuRef} style={{ paddingTop: menuHeight }}>
                <Menu fixed="top">
                    <Container>
                        <Menu.Item className={"no-left-border" + logoBorder}>
                            <Image size="mini" src={logo} as="a" href="/" onLoad={this.logoLoaded} />
                        </Menu.Item>
                        {screenSize !== "desktop" && (
                            <F>
                                <Menu.Item onClick={this.handleToggle} className="no-border">
                                    <Icon name="sidebar" />
                                </Menu.Item>
                                <Sidebar.Pushable
                                    style={{
                                        top: "100%",
                                        position: "absolute",
                                        minHeight: "100vh",
                                        width: "100%"
                                    }}
                                >
                                    <Sidebar.Pusher dimmed={visible} onClick={this.handleToggle} />
                                    <Sidebar
                                        as={Menu}
                                        animation="overlay"
                                        vertical
                                        visible={visible}
                                        content={menuItemBuilder(
                                            leftItems.concat(screenSize === "mini" ? rightItems : [])
                                        )}
                                    />
                                </Sidebar.Pushable>
                            </F>
                        )}
                        {screenSize === "desktop" && menuItemBuilder(leftItems)}
                        {screenSize !== "mini" && (
                            <Menu.Menu
                                position="right"
                                content={menuItemBuilder(rightItems)}
                                className="right-side-menu"
                            />
                        )}
                    </Container>
                </Menu>
            </div>
        );
    }
}

const { array } = PropTypes;
NavBar.propTypes = {
    leftItems: array,
    rightItems: array
};

export default NavBar;
