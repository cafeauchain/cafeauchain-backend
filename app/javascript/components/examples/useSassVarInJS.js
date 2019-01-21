import React, { Component, Fragment as F } from "react";
import { Container, Menu, Visibility } from "semantic-ui-react";

import styles from "./scss/styles.scss";

const menuStyle = {
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    marginBottom: "1em",
    marginTop: "4em",
    transition: "box-shadow 0.5s ease, padding 0.5s ease"
};

const fixedMenuStyle = {
    backgroundColor: styles.var,
    border: "1px solid #ddd",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
};
const messageStyle = {
    padding: "10px"
};
const bufferStyle = {
    height: "60px",
    marginTop: "5em"
};

export default class Example extends Component {
    state = {
        menuFixed: false
    };

    stickTopMenu = () => this.setState({ menuFixed: true });
    unStickTopMenu = () => this.setState({ menuFixed: false });

    render() {
        const { menuFixed } = this.state;
        //eslint-disable-next-line
        const text = `This is an example of a sass variable in js. On scroll, the container color should change to ${
            styles.var
            //eslint-disable-next-line
        }, which is set in "../scss/styles.scss" (relative to this component) and declared in the component vs as a class in css.`;

        return (
            <F>
                <Visibility onTopPassed={this.stickTopMenu} onTopVisible={this.unStickTopMenu} once={false}>
                    <Menu
                        borderless
                        fixed={menuFixed ? "top" : undefined}
                        style={menuFixed ? fixedMenuStyle : menuStyle}
                    >
                        <div style={messageStyle}>{text}</div>
                    </Menu>
                </Visibility>
                <div className="buffer" style={menuFixed ? bufferStyle : {}} />
                <div>
                    <Container style={{ background: "white", height: 1000 }}>This is just a 1000px spacer.</Container>
                </div>
            </F>
        );
    }
}
