import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";

import fields from "./fields";

import Input from "../shared/input";

import readCookie from "../utilities/readCookie";
import capitalize from "../utilities/capitalize";
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
            user: { ...details }
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
        if (response.ok) {
            const responseJson = await response.json()
            window.location.href = await responseJson.redirect_url
        } else {
            // TODO need to add error handling
            // eslint-disable-next-line
            await console.log("error", response.json());
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

    renderInputs = inputs =>
        inputs.map(input => (
            <Input
                {...input}
                key={input.label}
                onChange={this.handleInputChange}
                autoComplete="true"
                iconPosition="left"
                labelPosition="left"
            />
        ));

    setText = fieldType => {
        let text = {};
        switch (fieldType) {
        case "login":
            text.heading = "Log in to you account";
            text.message = "Need an Account?";
            text.url = "/users/sign_up";
            text.linkText = "Sign Up!";
            break;
        case "register":
            text.heading = "Create an account";
            text.message = "Already signed up?";
            text.url = "/users/sign_in";
            text.linkText = "Log In!";
            break;
        }
        return text;
    };

    render() {
        const { fieldType } = this.props;
        const text = this.setText(fieldType);
        return (
            <Grid
                textAlign="center"
                style={{ height: "100%", margin: "auto 0", padding: "4em 0" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header
                        as="h2"
                        textAlign="center"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Image src={logo} style={{ marginRight: 10 }} />
                        <span>{text.heading}</span>
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
                        <Segment>
                            {this.renderInputs(fields[fieldType])}
                            <Button fluid size="large" primary>
                                {capitalize(fieldType)}
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        <span>
                            {text.message}
                            {' '}
                        </span>
                        <a href={text.url}>{text.linkText}</a>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
const { string } = PropTypes;
Login.propTypes = {
    url: string,
    fieldType: string
};

export default Login;
