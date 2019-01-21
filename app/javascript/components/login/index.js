import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";

import readCookie from "../utilities/readCookie";
import logo from "../../../assets/images/cac-unofficial-logo.png";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        details: {}
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { url } = this.props;
        const { details } = this.state;
        const body = {
            user: {
                email: details.email,
                password: details.password
            }
        };
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status === 200) {
            window.location.href = "/admin/dashboard";
        } else {
            // eslint-disable-next-line
            console.log("error", response);
        }
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };

    render() {
        return (
            <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center" style={{ display: "flex", alignItems: "center" }}>
                        <Image src={logo} />
                        <span>Log in to your account</span>
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="E-mail"
                                name="email"
                                onChange={this.handleInputChange}
                                autoComplete="true"
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={this.handleInputChange}
                                autoComplete="true"
                            />

                            <Button fluid size="large" primary>
                                Login
                            </Button>
                            <br />
                            <Button fluid size="large" primary inverted>
                                Cancel
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? 
                        {' '}
                        <a href="/users/sign_up">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
const { string } = PropTypes;
Login.propTypes = {
    url: string
};

export default Login;
