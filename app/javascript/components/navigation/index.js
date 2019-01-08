import React, { Component } from "react";
import { Form, Container, Header, Divider, Menu } from "semantic-ui-react";

class Nav extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {};
    }
    handleClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <Menu borderless>
                <Menu.Item name="Home" active={activeItem === "Home"} onClick={this.handleClick} />
                <Menu.Item name="Profile" active={activeItem === "Profile"} onClick={this.handleClick} />
                <Menu.Item name="Logout" active={activeItem === "Logout"} onClick={this.handleClick} />
            </Menu>
        );
    }
}

export default Nav;
