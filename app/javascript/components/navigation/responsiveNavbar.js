import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Container, Icon, Image, Menu, Sidebar, Responsive } from "semantic-ui-react";

import logo from "../../../assets/images/cac-unofficial-logo.png";

const menuItemBuilder = array => array.map(item => <Menu.Item key={item.key} {...item} />);

const NavBarTablet = ({ leftItems, rightItems, onToggle, visible, mobile }) => (
    <Menu fixed="top">
        <Container>
            <Menu.Item>
                <Image size="mini" src={logo} />
            </Menu.Item>
            <Menu.Item onClick={onToggle} className="no-border">
                <Icon name="sidebar" />
            </Menu.Item>
            {!mobile && <Menu.Menu position="right" content={menuItemBuilder(rightItems)} />}

            <Sidebar.Pushable style={{ top: "100%", position: "absolute", minHeight: "100vh", width: "100%" }}>
                <Sidebar.Pusher dimmed={visible} onClick={onToggle} />
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    vertical
                    visible={visible}
                    content={menuItemBuilder(leftItems.concat(mobile ? rightItems : []))}
                />
            </Sidebar.Pushable>
        </Container>
    </Menu>
);

const { func, array, bool } = PropTypes;
NavBarTablet.propTypes = {
    leftItems: array,
    onToggle: func,
    rightItems: array,
    visible: bool,
    mobile: bool
};

const NavBarDesktop = ({ leftItems, rightItems }) => (
    <Menu fixed="top">
        <Container>
            <Menu.Item className="no-left-border">
                <Image size="mini" src={logo} />
            </Menu.Item>
            {menuItemBuilder(leftItems)}
            <Menu.Menu position="right">{menuItemBuilder(rightItems)}</Menu.Menu>
        </Container>
    </Menu>
);
NavBarDesktop.propTypes = {
    leftItems: array,
    rightItems: array
};

class NavBar extends Component {
    state = {
        visible: false
    };

    handleToggle = () =>
        this.setState(prevState => {
            return { visible: !prevState.visible };
        });

    render() {
        const { leftItems, rightItems } = this.props;
        const { visible } = this.state;

        return (
            <F>
                <Responsive maxWidth={340}>
                    <NavBarTablet
                        leftItems={leftItems}
                        onPusherClick={this.handlePusher}
                        onToggle={this.handleToggle}
                        rightItems={rightItems}
                        visible={visible}
                        mobile
                    />
                </Responsive>
                <Responsive minWidth={341} maxWidth={600}>
                    <NavBarTablet
                        leftItems={leftItems}
                        onPusherClick={this.handleToggle}
                        onToggle={this.handleToggle}
                        rightItems={rightItems}
                        visible={visible}
                    />
                </Responsive>
                <Responsive minWidth={601}>
                    <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
                </Responsive>
            </F>
        );
    }
}
NavBar.propTypes = {
    leftItems: array,
    rightItems: array
};

const leftItems = [
    { as: "a", content: "Home", key: "home", href: "/roasters/1" },
    { as: "a", content: "Users", key: "users" }
];
const rightItems = [{ as: "a", content: "Login", key: "login" }, { as: "a", content: "Register", key: "register" }];

const App = () => <NavBar leftItems={leftItems} rightItems={rightItems} />;

export default App;
